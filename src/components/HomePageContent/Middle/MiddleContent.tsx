import React from 'react';
import ThemeContext from '../../../context/ThemeContext';
import {
	executeRESTMethod,
	usePosts,
	usePostInfinite
} from '../../../libs/apiUtils';
import Posts from './Posts';
import Errors from '../../Reusable/Errors';
import IsLoading from '../../Reusable/IsLoading';
import { getToken } from '../../../libs/authUtils';
import { useSWRConfig } from 'swr';
import HorizontalLine from '../../Reusable/HorizontalLine';
import BoldText from '../../Reusable/BoldText';
import Button from '../../Reusable/Button';
import { Box, Modal } from '@mui/material';
// import { useSWRInfinite } from 'swr';

function MiddleContent(): React.ReactElement {
	const [newPostContent, setNewPostContent] = React.useState('');
	const [showModal, setShowModal] = React.useState(false);
	const { mutate } = useSWRConfig();
	const contextValue = React.useContext(ThemeContext);
	const { _id: userid } = contextValue.user;
	// const { allPosts, isLoading, errorsData } = usePosts(userid, getToken());
	const { allPosts, error, isLoadingMore, size, setSize, isReachingEnd } =
		usePostInfinite(userid, getToken());
	// console.log({ allPosts });
	function handleModal(): void {
		setShowModal(!showModal);
	}

	function handleContentChange(
		event: React.ChangeEvent<HTMLTextAreaElement>
	): void {
		setNewPostContent(event.target.value);
	}

	async function handleNewPostSubmit(): Promise<void> {
		await executeRESTMethod('post', `posts/`, getToken(), {
			content: newPostContent,
			userid
		});
		await mutate([
			`${process.env.GATSBY_ODIN_BOOK}/posts/${userid}`,
			getToken()
		]);
		setNewPostContent('');
		handleModal();
	}

	function showComponentBasedOnState(): React.ReactNode {
		if (errorsData) {
			return <Errors errorsData={errorsData} />;
		} else if (isLoading) {
			return <IsLoading isLoading={isLoading} />;
		} else {
			return (
				<div className='middleContentContainer col-span-2 m-auto'>
					<Modal
						open={showModal}
						onClose={handleModal}
						aria-labelledby='modal-modal-title'
						aria-describedby='modal-modal-description'
					>
						<Box className='absolute top-2/4 left-2/4 w-96 bg-white shadow-lg p-8 transform -translate-y-2/4 -translate-x-2/4'>
							<div className='text-center flex flex-col my-4'>
								<label>
									<textarea
										className='border-2 border-black'
										placeholder="What's on your mind"
										cols={30}
										rows={5}
										value={newPostContent}
										onChange={(event) =>
											handleContentChange(event)
										}
									/>
								</label>

								<Button
									isDisabled={newPostContent === ''}
									color='bg-blue'
									width='w-40'
									buttonAction={handleNewPostSubmit}
									buttonMessage='Submit'
								/>
							</div>
						</Box>
					</Modal>

					<BoldText text='Timeline' greyFlag='text-darkGrey' />

					<HorizontalLine />

					<div className='text-center flex flex-col mb-4'>
						<Button
							color='bg-blue'
							width='w-40'
							buttonAction={handleModal}
							buttonMessage='Create New Post'
						/>
					</div>

					{/* <Posts posts={allPosts.posts} /> */}

					<button
						disabled={isLoadingMore || isReachingEnd}
						onClick={() => setSize(size + 1)}
					>
						{isLoadingMore
							? 'loading...'
							: isReachingEnd
							? 'no more issues'
							: 'load more'}
					</button>
				</div>
			);
		}
	}
	return <>{ShowComponentBasedOnState()}</>;
	// return (
	// <button
	// 	disabled={isLoadingMore || isReachingEnd}
	// 	onClick={() => setSize(size + 1)}
	// >
	// 	{isLoadingMore
	// 		? 'loading...'
	// 		: isReachingEnd
	// 		? 'no more issues'
	// 		: 'load more'}
	// </button>
	// );
}

export default MiddleContent;
