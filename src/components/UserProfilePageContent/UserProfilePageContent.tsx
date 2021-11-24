import React from 'react';
import Temp from '../../images/icon.png';
import ThemeContext from '../../context/ThemeContext';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import About from './About';
import { formatFriendsText } from '../../libs/utils';
import UserPosts from './UserPosts';
import Friends from './Friends';
import { UserType } from '../../libs/types';

type UserProfilePageContentProps = {
	userData: UserType;
};

function UserProfilePageContent({ userData }: UserProfilePageContentProps) {
	const [showTabContent, setShowTabContent] = React.useState(1);
	const contextValue = React.useContext(ThemeContext);
	const { user } = contextValue;
	// const { _id, friends, full_name, date_joined } = user;
	const { _id, friends, full_name, date_joined } = userData;
	console.log({ user });
	console.log({ userData });
	function handleSetShowTabContent(tabFlag: number): void {
		if (tabFlag === 1) {
			setShowTabContent(1);
		} else if (tabFlag === 2) {
			setShowTabContent(2);
		} else {
			setShowTabContent(3);
		}
	}

	function showTabContentComponents() {
		if (showTabContent === 1) {
			return <UserPosts />;
		} else if (showTabContent === 2) {
			return (
				<About
					about_text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada libero auctor, aliquam est a, elementum sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec mollis, purus in faucibus congue, tellus ex tristique augue, nec fringilla lectus est vel ipsum. Donec eu leo tortor. Integer mollis fermentum pellentesque. Suspendisse sed finibus massa. Maecenas ullamcorper mauris erat, sed malesuada tellus hendrerit scelerisque. Aliquam fringilla odio et diam scelerisque volutpat.'
					date_joined={date_joined}
					full_name={full_name}
				/>
			);
		} else {
			return <Friends friends={friends} />;
		}
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
