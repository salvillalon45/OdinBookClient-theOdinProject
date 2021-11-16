import React from 'react';

type CommentItemProps = {
	content: string;
	picture: string;
};

function CommentItem(props: CommentItemProps): React.ReactElement {
	const { content, picture } = props;
	const [showComments, setShowComments] = React.useState(true);

	return (
		<div className='commentItemContainer'>
			<div className='bg-grey rounded-2xl	p-1 pl-2 ml-12'>
				<p className='font-semibold	'>User 1</p>
				<p>Content</p>
			</div>

			<div className='likeContainer ml-12'>
				<p>Like</p>
			</div>
		</div>
	);
}

export default CommentItem;
