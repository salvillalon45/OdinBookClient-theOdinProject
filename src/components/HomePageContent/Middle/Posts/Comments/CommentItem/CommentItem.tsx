import { userInfo } from 'os';
import React from 'react';
import { usePosts } from '../../../../../../libs/apiUtils';
import { getToken } from '../../../../../../libs/authUtils';
import { CommentType } from '../../../../../../libs/types';
import { getCommentById, getPostById } from '../../../../../../libs/utils';
import UserLinkText from '../../../../../Reusable/UserLinkText';

type CommentItemProps = {
	comment: CommentType;
};

function CommentItem({ comment }: CommentItemProps): React.ReactElement {
	const [isLike, setIsLike] = React.useState(false);
	const { _id: commentid, author, post_ref: postid } = comment;
	const { full_name, _id: userid } = author;

	const { allPosts, isLoading, errorsData } = usePosts(userid, getToken());
	console.log({ isLoading });
	let content = '';
	let likes = [];
	let date_commented = '';
	let comments = [];

	if (!isLoading && allPosts) {
		const retrievedPost = getPostById(allPosts?.posts, postid);
		// const retrieveComment = getCommentById(
		// 	allPosts?.posts,
		// 	postid,
		// 	commentid
		// );
		content = retrievedPost.content;
		likes = retrievedPost.likes;
		date_posted = retrievedPost.date_posted;
		comments = retrievedPost.comments;
	}

	const likesText = likes.length > 1 || likes.length === 0 ? 'likes' : 'like';

	return (
		<div className='commentItemContainer mx-4'>
			<div className='bg-grey rounded-2xl	p-1 pl-2'>
				<UserLinkText
					userid={userid}
					full_name={full_name}
					flag='comment'
				/>
				<p>{content}</p>
			</div>

			<div className='flex flex-wrap likeContainer ml-2'>
				<p
					className='cursor-pointer'
					onClick={() => setIsLike(!isLike)}
				>
					{isLike ? 'Unlike' : 'Like'}
				</p>
				<p className='mx-4 text-lg'>
					{likes.length} {likesText}
				</p>
				<p className='hover:underline text-darkGrey font-medium text-sm'>
					{date_commented}
				</p>
			</div>
		</div>
	);
}

export default CommentItem;
