import React from 'react';
import CommentItem from './CommentItem';
import Logo from '../../../../../images/logo.png';

function Comments(): React.ReactElement {
	function createCommentItems(): React.ReactNode {
		return [1, 2, 3, 4, 5].map((index) => {
			return (
				<CommentItem
					content={
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.'
					}
					picture={Logo}
				/>
			);
		});
	}

	return (
		<div className='commentsContainers flex flex-col gap-4'>
			{createCommentItems()}
		</div>
	);
}

export default Comments;
