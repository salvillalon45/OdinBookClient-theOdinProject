// React & SWR
import React from 'react';
import { useSWRConfig } from 'swr';
import { formatFriendsText, getPosts } from '../../libs/utils';

// Components
import About from './About';
import UserPosts from './UserPosts';
import Friends from './Friends';
import UserProfileImage from '../Reusable/UserProfileImage';
import Button from '../Reusable/Button';
import { Box, Modal } from '@mui/material';

// Utils
import {
	executeRESTMethod,
	usePostInfinite,
	useUserByID
} from '../../libs/apiUtils';
import { PostType, UserType } from '../../libs/types';
import { getToken } from '../../libs/authUtils';
import getComponentBasedOnState from '../Reusable/getComponentBasedOnState';

type UserProfilePageContentProps = {
	userData: UserType;
	showTabContent?: number;
};

function UserProfilePageContent({
	userData: buildTimeUserData,
	showTabContent: showTabContentProps
}: UserProfilePageContentProps) {
	const [showTabContent, setShowTabContent] =
		React.useState(showTabContentProps);
	const [showModal, setShowModal] = React.useState(false);
	const [imageObj, setImageObj] = React.useState<FormData | string>('');
	const [multerImage, setMulterImage] = React.useState('');
	const { mutate } = useSWRConfig();
	const { _id: userid } = buildTimeUserData;
	const {
		allPosts,
		errorsData,
		isLoadingMore,
		size,
		setSize,
		isReachingEnd
	} = usePostInfinite(userid, getToken());
	const {
		userData,
		isLoading: isLoadingUser,
		errorsData: errorsDataUser
	} = useUserByID(userid, getToken());

	function handleChangePageSize(): void {
		setSize(size + 1);
	}

	function handleSetShowTabContent(tabFlag: number): void {
		if (tabFlag === 1) {
			setShowTabContent(1);
		} else if (tabFlag === 2) {
			setShowTabContent(2);
		} else {
			setShowTabContent(3);
		}
	}

	function handleModal(): void {
		setShowModal(!showModal);
	}

	function uploadImage(event: any) {
		const { files } = event.target;
		const imageFormData = new FormData();

		imageFormData.append('imageData', files[0]);

		setMulterImage(URL.createObjectURL(files[0]));
		setImageObj(imageFormData);
	}

	async function handleUpdateUserProfilePic(): Promise<void> {
		await executeRESTMethod(
			'put',
			`users/${userid}/image`,
			getToken(),
			{
				image_obj: imageObj
			},
			'withFilesFlag'
		);
		await mutate([
			`${process.env.GATSBY_ODIN_BOOK}/users/${userid}`,
			getToken()
		]);

		setMulterImage('');
		handleModal();
	}

	function showTabContentComponents(
		date_joined: string,
		full_name: string,
		friends: UserType[]
	): React.ReactNode {
		let cp: React.ReactNode = null;

		if (showTabContent === 1) {
			const userPosts: PostType[] = getPosts(allPosts, 'userPosts');
			cp = (
				<>
					<UserPosts posts={userPosts} />

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
				</>
			);
		} else if (showTabContent === 2) {
			cp = (
				<>
					<About
						about_text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada libero auctor, aliquam est a, elementum sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec mollis, purus in faucibus congue, tellus ex tristique augue, nec fringilla lectus est vel ipsum. Donec eu leo tortor. Integer mollis fermentum pellentesque. Suspendisse sed finibus massa. Maecenas ullamcorper mauris erat, sed malesuada tellus hendrerit scelerisque. Aliquam fringilla odio et diam scelerisque volutpat.'
						date_joined={date_joined}
						full_name={full_name}
					/>

					{/* Code commented since I need to include a cloud based storage to store images when deploying to heroku */}
					{/* <div className='text-center flex flex-col mb-4'>
						<Button
							color='bg-blue'
							width='w-40'
							buttonAction={handleModal}
							buttonMessage='Update Profile Picture'
						/>
					</div> */}
				</>
			);
		} else {
			cp = <Friends friends={friends} />;
		}

		return cp;
	}

	function showComponentBasedOnState(): React.ReactNode {
		const postCPState = getComponentBasedOnState(errorsData, isLoadingMore);
		const userCPState = getComponentBasedOnState(
			errorsDataUser,
			isLoadingUser
		);
		if (!!postCPState) {
			return postCPState;
		}
		if (!!userCPState) {
			return userCPState;
		}

		const { profile_pic_url, friends, full_name, date_joined } =
			userData.user;

		return (
			<div className='userProfilePageContentContainer'>
				<div className='bg-white pb-2'>
					<div className='userIntroContainer pt-8 flex flex-wrap justify-center items-center'>
						<div className='mr-12'>
							<Modal
								open={showModal}
								onClose={handleModal}
								aria-labelledby='modal-modal-title'
								aria-describedby='modal-modal-description'
							>
								<Box className='absolute top-2/4 left-2/4 w-96 bg-white shadow-lg p-8 transform -translate-y-2/4 -translate-x-2/4'>
									<div className='text-center flex flex-col my-4'>
										<div className='text-center flex flex-col mb-4'>
											<input
												type='file'
												className='font-roboto mt-6 mr-12 ml-12'
												onChange={(event) =>
													uploadImage(event)
												}
											/>

											{multerImage && (
												<img
													src={multerImage}
													alt='upload-image'
													className='my-4'
												/>
											)}
										</div>

										<Button
											isDisabled={multerImage === ''}
											color='bg-blue'
											width='w-40'
											buttonAction={
												handleUpdateUserProfilePic
											}
											buttonMessage='Submit'
										/>
									</div>
								</Box>
							</Modal>

							<UserProfileImage
								profile_pic_url={profile_pic_url}
							/>
						</div>

						<div>
							<p className='font-extrabold text-4xl'>{`${full_name}`}</p>
							<p className='text-darkGrey font-medium text-lg'>
								{formatFriendsText(friends)}
							</p>
						</div>
					</div>

					<hr className='bg-darkGrey mt-4 w-1/2 m-auto' />

					<div className='tabsContainer flex flex-wrap justify-center items-center pl-8 mt-1'>
						<button
							className='hover:bg-greyHover rounded-lg p-4 text-darkGrey font-medium text-lg'
							onClick={() => handleSetShowTabContent(1)}
						>
							Posts
						</button>

						<button
							className='hover:bg-greyHover rounded-lg p-4 text-darkGrey font-medium text-lg'
							onClick={() => handleSetShowTabContent(2)}
						>
							About
						</button>

						<button
							className='hover:bg-greyHover rounded-lg p-4 text-darkGrey font-medium text-lg'
							onClick={() => handleSetShowTabContent(3)}
						>
							Friends
						</button>
					</div>
				</div>

				<div className='tabsContentContainer w-8/12	m-auto pb-8 pt-4'>
					{showTabContentComponents(date_joined, full_name, friends)}
				</div>
			</div>
		);
	}

	return <>{showComponentBasedOnState()}</>;
}

export default UserProfilePageContent;
