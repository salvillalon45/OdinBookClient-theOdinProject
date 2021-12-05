import React from 'react';
import { useSWRConfig } from 'swr';

import { CommentType, PostType, UserType } from '../../../../../libs/types';
import Comments from '../Comments';
import PostLike from '../PostLike';
import UserLinkText from '../../../../Reusable/UserLinkText';
import { getToken } from '../../../../../libs/authUtils';
import {
	checkStateOfLike,
	formatCommentsText,
	formatLikesText,
	getPostById,
	isEmptyObject
} from '../../../../../libs/utils';
import { executeRESTMethod, usePosts } from '../../../../../libs/apiUtils';
import Errors from '../../../../Reusable/Errors';
import IsLoading from '../../../../Reusable/IsLoading';
import ThemeContext from '../../../../../context/ThemeContext';

type PostItemProps = {
	post: PostType;
};

function PostItem({ post }: PostItemProps): React.ReactElement {
	const { mutate } = useSWRConfig();
	console.group('Inside PostItem');
	const { _id: postid } = post;
	const contextValue = React.useContext(ThemeContext);
	const { _id: userid } = contextValue.user;

	const { allPosts, isLoading, errorsData } = usePosts(userid, getToken());
	let content: string = '';
	let likes: UserType[] = [];
	let date_posted: string = '';
	let comments: CommentType[] = [];
	let full_name: string = '';
	let likeFlag: boolean;

	if (!isLoading && allPosts) {
		const retrievedPost: PostType = getPostById(allPosts.posts, postid);
		if (!isEmptyObject(retrievedPost)) {
			content = retrievedPost.content;
			likes = retrievedPost.likes;
			date_posted = retrievedPost.date_posted;
			comments = retrievedPost.comments;
			likeFlag = checkStateOfLike(retrievedPost, userid);
			full_name = retrievedPost.author.full_name;
		}
	}

	const [newCommentContent, setNewCommentContent] = React.useState('');
	const [showComments, setShowComments] = React.useState(false);
	// console.log({ post });
	// console.log({ allPosts });
	console.groupEnd();

	function handleContentChange(
		event: React.ChangeEvent<HTMLTextAreaElement>
	): void {
		setNewCommentContent(event.target.value);
	}

	async function handleNewCommentSubmit(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();
		await executeRESTMethod(
			'post',
			`posts/${postid}/comments`,
			getToken(),
			{ content: newCommentContent, userid }
		);
		await mutate([
			`${process.env.GATSBY_ODIN_BOOK}/posts/${userid}`,
			getToken()
		]);
	}

	async function handlePostLikeSubmit(): Promise<void> {
		await executeRESTMethod('put', `posts/${postid}/like`, getToken(), {
			userid
		});
		await mutate([
			`${process.env.GATSBY_ODIN_BOOK}/posts/${userid}`,
			getToken()
		]);
	}

	function showCommentsContent(): React.ReactNode {
		if (comments.length === 0) {
			return (
				<div className='text-center p-4	'>
					<p>No comments for post</p>
				</div>
			);
		} else if (showComments) {
			return (
				<>
					<div>
						<form
							onSubmit={(event) => handleNewCommentSubmit(event)}
						>
							<label>
								<textarea
									placeholder='Write a comment'
									value={newCommentContent}
									onChange={(event) =>
										handleContentChange(event)
									}
								/>
							</label>
							<input type='submit' value='Submit' />
						</form>
					</div>

					<Comments comments={comments} />
				</>
			);
		} else {
			return null;
		}
	}

	function showComponentBasedOnState(): React.ReactNode {
		if (errorsData) {
			return <Errors errorsData={errorsData} />;
		} else if (isLoading) {
			return <IsLoading isLoading={isLoading} />;
		} else {
			return (
				<div className='bg-white max-w-sm rounded overflow-hidden shadow-sm'>
					<h1>LENGTH::: {comments.length}</h1>
					<div className='mx-4 mt-2'>
						<UserLinkText
							userid={userid}
							full_name={full_name}
							flag=''
						/>

						<p className='hover:underline text-darkGrey font-medium text-sm'>
							{date_posted}
						</p>
					</div>

					<div className='px-6 py-4'>
						<p className='text-gray-700 text-base'>{content}</p>
					</div>

					<img
						className='w-full'
						// src={picture}
						alt='Post Picture'
					/>

					<div className='reactionsAndCommentsContainer flex justify-between mb-3'>
						<p className='mx-4 text-lg'>
							{likes.length} {formatLikesText(likes)}
						</p>
						<p className='mx-4 text-lg'>
							{comments.length} {formatCommentsText(comments)}
						</p>
					</div>

					<hr />

					<div className='viewingUserActionsContainer flex justify-around my-2'>
						<button
							className='mx-4 text-lg cursor-pointer'
							onClick={() => {
								handlePostLikeSubmit();
							}}
						>
							<PostLike
								// isLike={likeFlag !== undefined && likeFlag}
								isLike={likeFlag}
							/>
						</button>

						<p className='mx-4 text-lg cursor-pointer'>
							<i
								className='bi bi-chat-left'
								onClick={() => setShowComments(!showComments)}
							/>
						</p>
					</div>

					<hr />

					{showCommentsContent()}
				</div>
			);
		}
	}

	return <>{showComponentBasedOnState()}</>;
}

export default PostItem;
