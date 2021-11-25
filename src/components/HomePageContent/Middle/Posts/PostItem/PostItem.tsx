import { Link } from 'gatsby';
import React from 'react';
import { PostType } from '../../../../../libs/types';
import Comments from '../Comments';
import PostLike from '../PostLike';
import UserLinkText from '../../../../Reusable/UserLinkText';

type PostItemProps = {
	post: PostType;
};

function PostItem({ post }: PostItemProps): React.ReactElement {
	const [isLike, setIsLike] = React.useState(false);
	const [showComments, setShowComments] = React.useState(false);
	const { content, likes, author, date_posted, comments } = post;
	const { full_name, _id: userid } = author;

	const likesText = likes.length > 1 || likes.length === 0 ? 'likes' : 'like';
	const commentText =
		comments.length > 1 || comments.length === 0 ? 'comments' : 'comment';

	return (
		<div className='bg-white max-w-sm rounded overflow-hidden shadow-sm'>
			<div className='mx-4 mt-2'>
				<UserLinkText userid={userid} full_name={full_name} flag='' />

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
					onClick={() => setIsLike(!isLike)}
				>
					<PostLike isLike={isLike} />
				</button>
				<p className='mx-4 text-lg cursor-pointer'>
					<i
						className='bi bi-chat-left'
						onClick={() => setShowComments(!showComments)}
					/>
				</p>
			</div>

			<hr />

			{showComments && comments.length === 0 ? (
				<div className='text-center p-4	'>
					<p>No comments for post</p>
				</div>
			) : (
				<Comments comments={comments} />
			)}
		</div>
	);
}

export default PostItem;
