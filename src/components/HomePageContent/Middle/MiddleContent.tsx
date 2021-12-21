// React
import React from 'react';
import ThemeContext from '../../../context/ThemeContext';

// Components
import Posts from './Posts';
import HorizontalLine from '../../Reusable/HorizontalLine';
import BoldText from '../../Reusable/BoldText';
import Button from '../../Reusable/Button';
import { Box, Modal } from '@mui/material';

// Utils
import { executeRESTMethod, usePostInfinite } from '../../../libs/apiUtils';
import { getToken } from '../../../libs/authUtils';
import { getPosts } from '../../../libs/utils';
import getComponentBasedOnState from '../../Reusable/getComponentBasedOnState';
import { PostType } from '../../../libs/types';
import IsLoading from '../../Reusable/IsLoading';

function MiddleContent(): React.ReactElement {
	const [newPostContent, setNewPostContent] = React.useState('');
	const [imageObj, setImageObj] = React.useState<FormData | string>('');
	const [showModal, setShowModal] = React.useState(false);
	const [newPostCreated, setNewPostCreated] = React.useState(false);
	const [multerImage, setMulterImage] = React.useState('');
	const contextValue = React.useContext(ThemeContext);
	const { _id: userid } = contextValue.user;
	const {
		allPosts,
		errorsData,
		isLoadingMore,
		infiniteMutate,
		size,
		setSize,
		isReachingEnd,
		isValidating
	} = usePostInfinite(userid, getToken());

	function handleNewPostCreated(): void {
		setNewPostCreated(!newPostCreated);
	}

	function handleModal(): void {
		setShowModal(!showModal);
	}

	function handleChangePageSize(): void {
		setSize(size + 1);
	}

	function handleContentChange(
		event: React.ChangeEvent<HTMLTextAreaElement>
	): void {
		setNewPostContent(event.target.value);
	}

	async function handleNewPostSubmit(): Promise<void> {
		const postData = await executeRESTMethod('post', `posts/`, getToken(), {
			content: newPostContent,
			userid
		});
		await executeRESTMethod(
			'put',
			`posts/${postData.post._id}/image`,
			getToken(),
			{
				image_obj: imageObj
			},
			'withFilesFlag'
		);

		infiniteMutate();
		handleNewPostCreated();
		setNewPostContent('');
		setMulterImage('');
		handleModal();
	}

	function uploadImage(event: any) {
		const { files } = event.target;
		const imageFormData = new FormData();

		imageFormData.append('imageData', files[0]);

		setMulterImage(URL.createObjectURL(files[0]));
		setImageObj(imageFormData);
	}

	function showComponentBasedOnState(): React.ReactNode {
		const result = getComponentBasedOnState(errorsData, isLoadingMore);
		if (!!result) {
			return result;
		} else {
			const posts: PostType[] = getPosts(allPosts, 'posts');
			let res: React.ReactNode = null;

			const middleContentContainer = (
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

								<div className='text-center flex flex-col mb-4'>
									<input
										type='file'
										className='font-roboto mt-6 mr-12 ml-12'
										onChange={(event) => uploadImage(event)}
									/>

									{multerImage && (
										<img
											src={multerImage}
											alt='upload-image'
											className='process__image mt-4'
										/>
									)}
								</div>

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

					<Posts posts={posts} />

					<div className='text-center flex flex-col mb-4'>
						<Button
							color='bg-blue'
							isDisabled={isLoadingMore || isReachingEnd}
							buttonAction={handleChangePageSize}
							buttonMessage={
								isLoadingMore
									? 'Loading...'
									: isReachingEnd
									? 'No More Issues'
									: 'Load More'
							}
						/>
					</div>
				</div>
			);

			// This check is used when the user creates a new post.
			// If the user creates a new post, we check is the usePostInfinite has finished validating (means getting updated data)
			// when it finishes then we return a the component
			if (newPostCreated) {
				if (!isValidating) {
					res = middleContentContainer;
					handleNewPostCreated();
				} else {
					res = <IsLoading />;
				}
			} else {
				res = middleContentContainer;
			}

			return res;
		}
	}

	return <>{showComponentBasedOnState()}</>;
}

export default MiddleContent;
