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
import getComponentBasedOnState from '../../../../Reusable/getComponentBasedOnState';

type PostItemProps = {
	post: PostType;
};

function PostItem({ post }: PostItemProps): React.ReactElement {
	const { mutate } = useSWRConfig();
	const [newCommentContent, setNewCommentContent] = React.useState('');
	const [showComments, setShowComments] = React.useState(false);
	const { _id: postid } = post;
	const contextValue = React.useContext(ThemeContext);
	const { _id: userid } = contextValue.user;
	const { allPosts, isLoading, errorsData } = usePosts(userid, getToken());

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

	function showCommentsContent(comments: CommentType[]): React.ReactNode {
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
		const result = getComponentBasedOnState(errorsData, isLoading);
		if (!!result) {
			return result;
		} else {
			const retrievedPost: PostType = getPostById(allPosts.posts, postid);
			const { content, likes, date_posted, comments, author } =
				retrievedPost;
			const { full_name } = author;
			const likeFlag = checkStateOfLike(retrievedPost, userid);

			return (
				<div className='bg-white max-w-sm rounded overflow-hidden shadow-sm'>
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
							<PostLike isLike={likeFlag} />
						</button>

						<p className='mx-4 text-lg cursor-pointer'>
							<i
								className='bi bi-chat-left'
								onClick={() => setShowComments(!showComments)}
							/>
						</p>
					</div>

					<hr />

					{showCommentsContent(comments)}
				</div>
			);
		}
	}

	return <>{showComponentBasedOnState()}</>;
}

export default PostItem;
