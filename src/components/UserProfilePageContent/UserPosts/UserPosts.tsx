import React from 'react';
import { PostType } from '../../../libs/types';
import Posts from '../../HomePageContent/Middle/Posts';

type UserPostsProps = {
	posts: PostType[];
};

function UserPosts({ posts }: UserPostsProps): React.ReactElement {
	return (
		<div className='userPostsContainer'>
			<div className='tabHeaderContainer w-10/12 m-auto'>
				<p className='text-darkGrey font-medium text-lg'>Posts</p>

				<hr className='bg-darkGrey mt-2 h-0.5' />
			</div>

			<div className='userPostsWrapperContainer flex flex-wrap justify-center gap-32 mt-4'>
				<Posts posts={posts} />
			</div>
		</div>
	);
}

export default UserPosts;
