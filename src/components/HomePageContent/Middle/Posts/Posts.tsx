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
			<div>
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
