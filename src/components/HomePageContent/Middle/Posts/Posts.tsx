import React from 'react';
import PostItem from './PostItem';
import Logo from '../../../../images/logo.png';
import { PostType } from '../../../../libs/types';

type PostsProps = {
	posts: PostType[];
};

function Posts({ posts }: PostsProps): React.ReactElement {
	function createPostItems(): React.ReactNode {
		return posts.map((post, index) => {
			return <PostItem key={index} post={post} />;
		});
	}

	function showPostContent() {
		if (posts.length === 0) {
			return (
				<div className='text-center p-4	'>
					<p>No Posts available</p>
				</div>
			);
		} else {
			return (
				<div className='postsContainers flex flex-col gap-4 mt-2'>
					{createPostItems()}
				</div>
			);
		}
	}

	return <>{showPostContent()}</>;
}

export default Posts;
