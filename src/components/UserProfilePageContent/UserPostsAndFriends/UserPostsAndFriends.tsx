import React from 'react';
import Posts from '../../HomePageContent/Middle/Posts';
import FriendsGrid from '../FriendsGrid';

function UserPostsAndFriends(): React.ReactElement {
	return (
		<div className='userPostsAndFriendsContainer'>
			<div className='tabHeaderContainer w-9/12 m-auto'>
				<p className='text-darkGrey font-medium text-lg'>Posts</p>

				<hr className='bg-darkGrey mt-2 h-0.5' />
			</div>

			<div className='flex flex-wrap justify-center gap-32'>
				<Posts />

				<FriendsGrid />
			</div>
		</div>
	);
}

export default UserPostsAndFriends;
