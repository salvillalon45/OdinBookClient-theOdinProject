// React & SWR
import React from 'react';
import { useSWRConfig } from 'swr';

// Components
import UserLinkText from '../../../../../Reusable/UserLinkText';

// Utils
import { executeRESTMethod, usePosts } from '../../../../../../libs/apiUtils';
import { getToken } from '../../../../../../libs/authUtils';
import { CommentType, PostType } from '../../../../../../libs/types';
import {
	checkStateOfLike,
	formatLikesText,
	getCommentById,
	getPostById
} from '../../../../../../libs/utils';
import getComponentBasedOnState from '../../../../../Reusable/getComponentBasedOnState';

type CommentItemProps = {
	comment: CommentType;
};

function CommentItem({ comment }: CommentItemProps): React.ReactElement {
	const { mutate } = useSWRConfig();
	const { _id: commentid, author, post_ref: post } = comment;
	const { _id: postid } = post;
	const { full_name, _id: userid } = author;
	const { allPosts, isLoading, errorsData } = usePosts(userid, getToken());

	async function handleCommentLikeSubmit(): Promise<void> {
		await executeRESTMethod(
			'put',
			`posts/${postid}/comments/${commentid}/like`,
			getToken(),
			{ userid }
		);
		await mutate([
			`${process.env.GATSBY_ODIN_BOOK}/posts/${userid}`,
			getToken()
		]);
	}

	function showComponentBasedOnState(): React.ReactNode {
		const result = getComponentBasedOnState(errorsData, isLoading);
		if (!!result) {
			return result;
		} else {
			const retrievedPost: PostType = getPostById(allPosts.posts, postid);
			const retrievedComment: CommentType = getCommentById(
				retrievedPost,
				commentid
			);
			const { content, likes, date_commented } = retrievedComment;
			const likeFlag: boolean = checkStateOfLike(
				retrievedComment,
				userid
			);

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
								handleCommentLikeSubmit();
							}}
						>
							{!isLoading && (likeFlag ? 'Unlike' : 'Like')}
						</p>

						<p className='mx-4  text-sm'>
							{likes.length} {formatLikesText(likes)}
						</p>

						<p className='hover:underline text-darkGrey font-medium text-sm'>
							{date_commented}
						</p>
					</div>
				</div>
			);
		}
	}

	return <>{showComponentBasedOnState()}</>;
}

export default CommentItem;
