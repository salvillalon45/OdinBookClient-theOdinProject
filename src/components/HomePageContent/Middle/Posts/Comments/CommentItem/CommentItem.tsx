import useSWR, { useSWRConfig } from 'swr';
import React from 'react';
import { executeRESTMethod, usePosts } from '../../../../../../libs/apiUtils';
import { getToken } from '../../../../../../libs/authUtils';
import { CommentType, UserType } from '../../../../../../libs/types';
import {
	checkStateOfLike,
	formatLikesText,
	getCommentById,
	getPostById,
	isEmptyObject
} from '../../../../../../libs/utils';
import UserLinkText from '../../../../../Reusable/UserLinkText';
import Errors from '../../../../../Reusable/Errors';
import IsLoading from '../../../../../Reusable/IsLoading';

type CommentItemProps = {
	comment: CommentType;
};

function CommentItem({ comment }: CommentItemProps): React.ReactElement {
	const { mutate } = useSWRConfig();
	const { _id: commentid, author, post_ref: post } = comment;
	const { _id: postid } = post;
	const { full_name, _id: userid } = author;
	const { allPosts, isLoading, errorsData } = usePosts(userid, getToken());
	let content: string = '';
	let likes: UserType[] = [];
	let date_commented: string = '';
	let likeFlag: boolean;

	if (!isLoading && allPosts) {
		const retrievedPost = getPostById(allPosts.posts, postid);
		const retrieveComment: CommentType = getCommentById(
			retrievedPost,
			commentid
		);
		if (!isEmptyObject(retrievedPost) && !isEmptyObject(retrieveComment)) {
			content = retrieveComment.content;
			likes = retrieveComment.likes;
			date_commented = retrieveComment.date_commented;
			likeFlag = checkStateOfLike(retrieveComment, userid);
		}
	}

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
		if (errorsData) {
			return <Errors errorsData={errorsData} />;
		} else if (isLoading) {
			return <IsLoading isLoading={isLoading} />;
		} else {
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
