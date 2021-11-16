import React from 'react';
import Comments from '../Comments';

type PostItemProps = {
	content: string;
	picture: string;
};

function PostItem(props: PostItemProps): React.ReactElement {
	const { content, picture } = props;
	const [showComments, setShowComments] = React.useState(true);

	return (
		<div className='bg-white max-w-sm rounded overflow-hidden shadow-sm'>
			<div className='px-6 py-4'>
				<p className='text-gray-700 text-base'>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Voluptatibus quia, nulla! Maiores et perferendis eaque,
					exercitationem praesentium nihil.
				</p>
			</div>

			<img
				className='w-full'
				src={picture}
				alt='Sunset in the mountains'
			/>

			<div className='reactionsAndCommentsContainer flex justify-between'>
				<p className='mx-4 text-lg'>35 reactions</p>
				<p className='mx-4 text-lg'>7 Comments</p>
			</div>

			<hr />

			<div className='viewingUserActionsContainer flex justify-around'>
				<p className='mx-4 text-lg cursor-pointer'>
					<i className='bi bi-hand-thumbs-up-fill' />
				</p>
				<p className='mx-4 text-lg cursor-pointer'>
					<i
						className='bi bi-chat-left'
						onClick={() => setShowComments(!showComments)}
					/>
				</p>
			</div>

			<hr />

			{showComments && <Comments />}
		</div>
	);
}

export default PostItem;
