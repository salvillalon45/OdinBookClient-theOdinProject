import { Link } from 'gatsby';
import useSWR, { useSWRConfig } from 'swr';

import React from 'react';
import { CommentType, PostType } from '../../../../../libs/types';
import Comments from '../Comments';
import PostLike from '../PostLike';
import UserLinkText from '../../../../Reusable/UserLinkText';
import { getToken } from '../../../../../libs/authUtils';
import { checkStateOfLike, getPostById } from '../../../../../libs/utils';
import { executeRESTMethod, usePosts } from '../../../../../libs/apiUtils';
import ShowComponentBasedOnState from '../../../../Reusable/ShowComponentBasedOnState';

type PostItemProps = {
	post: PostType;
};

function PostItem({ post }: PostItemProps): React.ReactElement {
	const { mutate } = useSWRConfig();
	console.group('Inside PostItem');
	const { author, _id: postid } = post;
	const { full_name, _id: userid } = author;
	const { allPosts, isLoading, errorsData } = usePosts(userid, getToken());
	// console.log({ isLoading });
	// let content = '';
	// let likes = [];
	// let date_posted = '';
	// let comments: CommentType[] = [];
	// let likeFlag;
	// if (!isLoading && allPosts) {
	const retrievedPost = getPostById(allPosts.posts, postid);
	console.log({ retrievedPost });
	// let content = retrievedPost.content;
	// let likes = retrievedPost.likes;
	// let date_posted = retrievedPost.date_posted;
	// let comments = retrievedPost.comments;
	// let likeFlag = checkStateOfLike(allPosts.posts, userid);
	// const retrievedPost = getPostById(allPosts.posts, postid);
	let content = post.content;
	let likes = post.likes;
	let date_posted = post.date_posted;
	let comments = post.comments;
	let likeFlag = checkStateOfLike(post, userid);
	// console.log({ likeFlag });
	// console.log({ content, likes, date_posted, comments });
	const [test, setTest] = React.useState(allPosts);
	const [newCommentContent, setNewCommentContent] = React.useState('');
	const [isLike, setIsLike] = React.useState(likeFlag);
	const [showComments, setShowComments] = React.useState(false);
	console.log({ post });
	console.log({ allPosts });
	console.groupEnd();
	const likesText = likes.length > 1 || likes.length === 0 ? 'likes' : 'like';
	const commentText =
		comments.length > 1 || comments.length === 0 ? 'comments' : 'comment';

	function handleContentChange(
		event: React.ChangeEvent<HTMLTextAreaElement>
	) {
		setNewCommentContent(event.target.value);
	}

	async function handleNewCommentSubmit(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();
		console.group('Inside handleNewCommentSubmit');
		const result = await executeRESTMethod(
			'post',
			`posts/${postid}/comments`,
			getToken(),
			{ content: newCommentContent, userid }
		);
		console.log({ result });
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

	function showCommentsContent() {
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

	return (
		<>
			{/* {console.log('GOing to check on posts cp at the end')}
			{console.log({ allPosts })}
			{console.log({ test })}
			{console.log(' comments.length:: ' + comments.length)}
			{console.log(' allPosts.posts.length:: ' + allPosts.posts.length)} */}
			<ShowComponentBasedOnState
				errorsData={errorsData}
				isLoading={isLoading}
				resultComponent={
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
								{likes.length} {likesText}
							</p>
							<p className='mx-4 text-lg'>
								{comments.length} {commentText}
							</p>
						</div>

						<hr />

						<div className='viewingUserActionsContainer flex justify-around my-2'>
							<button
								className='mx-4 text-lg cursor-pointer'
								onClick={() => {
									setIsLike(!isLike);
									handlePostLikeSubmit();
								}}
							>
								<PostLike isLike={isLike} />
							</button>

							<p className='mx-4 text-lg cursor-pointer'>
								<i
									className='bi bi-chat-left'
									onClick={() =>
										setShowComments(!showComments)
									}
								/>
							</p>
						</div>

						<hr />

						{showCommentsContent()}
					</div>
				}
			/>
		</>
	);
}

export default PostItem;
