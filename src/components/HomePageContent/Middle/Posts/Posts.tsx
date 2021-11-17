import React from 'react';
import PostItem from './PostItem';
import Logo from '../../../../images/logo.png';

function Posts(): React.ReactElement {
	function createPostItems(): React.ReactNode {
		return [1, 2, 3, 4, 5].map((index) => {
			return (
				<PostItem
					content={
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.'
					}
					picture={Logo}
				/>
			);
		});
	}

	return (
		<div className='postsContainers flex flex-col gap-4 mt-2'>
			{createPostItems()}
		</div>
	);
}

export default Posts;
