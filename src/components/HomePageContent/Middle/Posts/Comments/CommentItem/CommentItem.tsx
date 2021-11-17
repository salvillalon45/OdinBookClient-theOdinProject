import React from 'react';

type CommentItemProps = {
	content: string;
	picture: string;
};

function CommentItem(props: CommentItemProps): React.ReactElement {
	const { content, picture } = props;
	const [isLike, setIsLike] = React.useState(false);

	return (
		<div className='commentItemContainer mx-4	'>
			<div className='bg-grey rounded-2xl	p-1 pl-2'>
				<p className='font-semibold	'>User 1</p>
				<p>Content</p>
			</div>

			<div className='likeContainer ml-2'>
				<p
					className='cursor-pointer'
					onClick={() => setIsLike(!isLike)}
				>
					{isLike ? 'Unlike' : 'Like'}
				</p>
			</div>
		</div>
	);
}

export default CommentItem;
