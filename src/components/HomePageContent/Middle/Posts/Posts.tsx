// React
import React from 'react';

// Components
import PostItem from './PostItem';

// Utils
import { PostType } from '../../../../libs/types';
import ShowComponentBasedOnData from '../../../Reusable/ShowComponentBasedOnData';

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
				{ShowComponentBasedOnData(
					'No Posts available',
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
