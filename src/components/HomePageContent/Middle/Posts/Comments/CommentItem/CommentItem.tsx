import useSWR, { useSWRConfig } from 'swr';
import React from 'react';
import { executeRESTMethod, usePosts } from '../../../../../../libs/apiUtils';
import { getToken } from '../../../../../../libs/authUtils';
import { CommentType } from '../../../../../../libs/types';
import { getCommentById, getPostById } from '../../../../../../libs/utils';
import UserLinkText from '../../../../../Reusable/UserLinkText';

type CommentItemProps = {
	comment: CommentType;
};

function CommentItem({ comment }: CommentItemProps): React.ReactElement {
	const [isLike, setIsLike] = React.useState(false);
	const { mutate } = useSWRConfig();
	const { _id: commentid, author, post_ref: post } = comment;
	const { _id: postid } = post;
	const { full_name, _id: userid } = author;

	const { allPosts, isLoading, errorsData } = usePosts(userid, getToken());
	console.log({ isLoading });
	let content = '';
	let likes = [];
	let date_commented = '';

	if (!isLoading && allPosts) {
		console.group('Inside loading check CommentItem');

		console.log('What is allPosts');
		console.log({ allPosts });
		const retrievedPost = getPostById(allPosts.posts, postid);
		console.log('What is retrievedPost');
		console.log({ retrievedPost });
		const retrieveComment: CommentType = getCommentById(post, commentid);

		console.log({ commentid });
		console.log({ retrieveComment });
		content = retrieveComment.content;
		likes = retrieveComment.likes;
		date_commented = retrieveComment.date_commented;
		console.groupEnd();
	}

	const likesText = likes.length > 1 || likes.length === 0 ? 'likes' : 'like';

	async function handleCommentLikeSubmit(): Promise<void> {
		const commentLikeData = await executeRESTMethod(
			'put',
			`posts/${postid}/comments/${commentid}/like`,
			getToken(),
			{ userid }
		);
		console.log('What is commentLikeData');
		console.log({
			commentLikeData
		});
		// setCurrentComments([
		// 	...currentComments,
		// 	commentLikeData.updated_comment
		// ]);

		console.group('Going to mutate from Comment LIKE DATA');
		const result = await mutate([
			`${process.env.GATSBY_ODIN_BOOK}/posts/${userid}`,
			getToken()
		]);
		console.log({ result });
		console.groupEnd();
	}

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
					className='cursor-pointer text-sm'
					onClick={() => {
						setIsLike(!isLike);
						handleCommentLikeSubmit();
					}}
				>
					{isLike ? 'Unlike' : 'Like'}
				</p>
				<p className='mx-4  text-sm'>
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
