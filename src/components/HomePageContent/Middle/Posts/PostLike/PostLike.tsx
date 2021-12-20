// React
import React from 'react';

type PostLikeProps = {
	isLike: boolean;
};

function PostLike({ isLike }: PostLikeProps): React.ReactElement {
	return (
		<>
			{isLike ? (
				<div>
					<i className='bi bi-hand-thumbs-up-fill' />
					<span className='ml-4'>Unlike</span>
				</div>
			) : (
				<div>
					<i className='bi bi-hand-thumbs-up' />
					<span className='ml-4'>Like</span>
				</div>
			)}
		</>
	);
}

export default PostLike;
