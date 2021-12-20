// React & SWR
import React from 'react';
import { useSWRConfig } from 'swr';
import ThemeContext from '../../../../../context/ThemeContext';

// Components
import NewCommentForm from './NewCommentForm';
import Comments from '../Comments';
import PostLike from '../PostLike';
import UserLinkText from '../../../../Reusable/UserLinkText';

// Utils
import { CommentType, PostType } from '../../../../../libs/types';
import { getToken } from '../../../../../libs/authUtils';
import {
	checkStateOfLike,
	formatCommentsText,
	formatLikesText,
	getPostById
} from '../../../../../libs/utils';
import { executeRESTMethod, usePosts } from '../../../../../libs/apiUtils';
import getComponentBasedOnState from '../../../../Reusable/getComponentBasedOnState';
import ShowComponentBasedOnData from '../../../../Reusable/ShowComponentBasedOnData';

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
		setNewCommentContent('');
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
		return (
			<>
				<NewCommentForm
					handleContentChange={handleContentChange}
					handleNewCommentSubmit={handleNewCommentSubmit}
					newCommentContent={newCommentContent}
				/>
				{showComments &&
					ShowComponentBasedOnData(
						'No comments for post',
						<Comments comments={comments} />,
						comments
					)}
			</>
		);
	}

	function showComponentBasedOnState(): React.ReactNode {
		const result = getComponentBasedOnState(errorsData, isLoading);
		if (!!result) {
			return result;
		} else {
			const retrievedPost: PostType = getPostById(allPosts.posts, postid);
			const {
				content,
				likes,
				date_posted,
				comments,
				author,
				attached_picture
			} = retrievedPost;
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

					<div>
						{attached_picture && (
							<img
								className='w-full'
								src={attached_picture}
								alt='Post Picture'
							/>
						)}
					</div>

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
							className='mx-4 text-lg'
							onClick={() => {
								handlePostLikeSubmit();
							}}
						>
							<PostLike isLike={likeFlag} />
						</button>

						<button className='mx-4 text-lg'>
							<i
								className='bi bi-chat-left'
								onClick={() => setShowComments(!showComments)}
							/>
						</button>
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
