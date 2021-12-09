import React from 'react';
import Temp from '../../images/icon.png';
import About from './About';
import { formatFriendsText } from '../../libs/utils';
import { usePosts, useUserByID } from '../../libs/apiUtils';
import UserPosts from './UserPosts';
import Friends from './Friends';
import { ErrorType, UserType } from '../../libs/types';
import { getToken } from '../../libs/authUtils';
import Errors from '../Reusable/Errors';
import IsLoading from '../Reusable/IsLoading';

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
	const { _id: userid } = buildTimeUserData;
	const {
		allPosts,
		isLoading: isLoadingPosts,
		errorsData: errorsDataPosts
	} = usePosts(userid, getToken());
	const {
		userData,
		isLoading: isLoadingUser,
		errorsData: errorsDataUser
	} = useUserByID(userid, getToken());

	let friends: UserType[] = [];
	let full_name: string = '';
	let date_joined: string = '';
	if (!isLoadingUser && userData) {
		friends = userData.user.friends;
		full_name = userData.user.full_name;
		date_joined = userData.user.date_joined;
	}

	function showComponentBasedOnState(
		errorsData: ErrorType,
		isLoading: boolean,
		result: React.ReactNode
	): React.ReactNode {
		if (errorsData) {
			return <Errors errorsData={errorsData} />;
		} else if (isLoading) {
			return <IsLoading isLoading={isLoading} />;
		} else {
			return result;
		}
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

	function showTabContentComponents(): React.ReactNode {
		let cp: React.ReactNode = null;
		let errorData: ErrorType;
		let isLoading: boolean = false;

		if (showTabContent === 1) {
			cp = <UserPosts posts={allPosts && allPosts.userPosts} />;
			errorData = errorsDataPosts;
			isLoading = isLoadingPosts;
		} else if (showTabContent === 2) {
			cp = (
				<About
					about_text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada libero auctor, aliquam est a, elementum sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec mollis, purus in faucibus congue, tellus ex tristique augue, nec fringilla lectus est vel ipsum. Donec eu leo tortor. Integer mollis fermentum pellentesque. Suspendisse sed finibus massa. Maecenas ullamcorper mauris erat, sed malesuada tellus hendrerit scelerisque. Aliquam fringilla odio et diam scelerisque volutpat.'
					date_joined={date_joined}
					full_name={full_name}
				/>
			);
			errorData = errorsDataUser;
			isLoading = isLoadingUser;
		} else {
			cp = <Friends friends={friends} />;
			errorData = errorsDataUser;
			isLoading = isLoadingUser;
		}

		return showComponentBasedOnState(errorData, isLoading, cp);
	}

	return (
		<div className='userProfilePageContentContainer'>
			<div className='bg-white pb-2'>
				<div className='userIntroContainer pt-8 flex flex-wrap justify-center items-center'>
					<div className='mr-12'>
						<img src={Temp} className='h-20' />
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
				{showTabContentComponents()}
			</div>
		</div>
	);
}

export default UserProfilePageContent;
