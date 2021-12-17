// React & SWR
import React from 'react';
import { useSWRConfig } from 'swr';
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
import { PostType, ImageType } from '../../../libs/types';

function MiddleContent(): React.ReactElement {
	const [newPostContent, setNewPostContent] = React.useState('');
	const [imageObj, setImageObj] = React.useState<ImageType | string>('');
	const [showModal, setShowModal] = React.useState(false);
	const [multerImage, setMulterImage] = React.useState('');
	const { mutate } = useSWRConfig();
	const contextValue = React.useContext(ThemeContext);
	const { _id: userid } = contextValue.user;
	const {
		allPosts,
		errorsData,
		isLoadingMore,
		size,
		setSize,
		isReachingEnd
	} = usePostInfinite(userid, getToken());

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
		console.log({ imageObj });
		await executeRESTMethod('post', `posts/`, getToken(), {
			content: newPostContent,
			userid,
			image_obj: imageObj
		});
		await mutate([
			`${process.env.GATSBY_ODIN_BOOK}/posts/${userid}`,
			getToken()
		]);
		setNewPostContent('');
		handleModal();
	}

	function uploadImage(event: any) {
		const { files } = event.target;
		const {
			lastModified,
			lastModifiedDate,
			name,
			size,
			type,
			webkitRelativePath
		} = files[0];
		// let lastModified: 1504113336000
		// lastModifiedDate: Wed Aug 30 2017 10:15:36 GMT-0700 (Pacific Daylight Time) {}
		// name: "809-pokemon-oras.png"
		// size: 1254941
		// type: "image/png"
		// webkitRelativePath: ""
		// = files[0];
		let newImageObj: ImageType = {
			image_name: `multer-image-${files[0].name}-${Date.now()}`,
			image_data: {
				lastModified,
				lastModifiedDate,
				name,
				size,
				type,
				webkitRelativePath
			}
		};
		console.log({ newImageObj });

		setMulterImage(URL.createObjectURL(files[0]));
		setImageObj(newImageObj);
	}

	function showComponentBasedOnState(): React.ReactNode {
		const result = getComponentBasedOnState(errorsData, isLoadingMore);
		if (!!result) {
			return result;
		} else {
			const posts: PostType[] = getPosts(allPosts, 'posts');

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

								<h4 className='process__heading'>
									Process: Using Multer
								</h4>
								<p className='process__details'>
									Upload image to a node server, connected to
									a MongoDB database, with the help of multer
								</p>

								<input
									type='file'
									className='process__upload-btn'
									onChange={(e) => uploadImage(e, 'multer')}
								/>
								<img
									src={multerImage}
									alt='upload-image'
									className='process__image'
								/>

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

					<Button
						color='bg-blue'
						isDisabled={isLoadingMore || isReachingEnd}
						buttonAction={handleChangePageSize}
						buttonMessage={
							isLoadingMore
								? 'loading...'
								: isReachingEnd
								? 'no more issues'
								: 'load more'
						}
					/>
				</div>
			);
		}
	}

	return <>{showComponentBasedOnState()}</>;
}

export default MiddleContent;
