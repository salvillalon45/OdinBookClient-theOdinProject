import React from 'react';
import PostItem from './PostItem';
import Logo from '../../../../images/logo.png';
import { PostType } from '../../../../libs/types';
import ShowCPBasedOnData from '../../../Reusable/ShowCPBasedOnData';

type PostsProps = {
	posts: PostType[];
};

function Posts({ posts }: PostsProps): React.ReactElement {
	function createPostItems(): React.ReactNode {
		return posts.map((post, index) => {
			return <PostItem key={index} post={post} />;
		});
	}

	function showPostContent(): React.ReactNode {
		return (
			<div className='contactsContainers gap-4 top-16 sticky'>
				<p className='text-darkGrey pl-2 font-medium text-lg'>
					Contacts
				</p>

				<hr className='bg-darkGrey' />

				{ShowCPBasedOnData(
					<div className='text-center p-4	'>
						<p>No Posts available</p>
					</div>,
					<div className='postsContainers flex flex-col gap-4 mt-2'>
						{createPostItems()}
					</div>,
					posts
				)}
			</div>
		);
	}

	return <>{showPostContent()}</>;
}

export default Posts;
