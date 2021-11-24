import React from 'react';
import Posts from '../../HomePageContent/Middle/Posts';

function UserPosts(): React.ReactElement {
	return (
		<div className='userPostsContainer'>
			<div className='tabHeaderContainer w-10/12	 m-auto'>
				<p className='text-darkGrey font-medium text-lg'>Posts</p>

				<hr className='bg-darkGrey mt-2 h-0.5' />
			</div>

			<div className='flex flex-wrap justify-center gap-32 mt-4'>
				<Posts />
			</div>
		</div>
	);
}

export default UserPosts;
