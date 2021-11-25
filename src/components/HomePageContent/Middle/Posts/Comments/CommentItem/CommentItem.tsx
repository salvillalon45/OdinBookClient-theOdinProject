import { userInfo } from 'os';
import React from 'react';
import { CommentType } from '../../../../../../libs/types';
import UserLinkText from '../../../../../Reusable/UserLinkText';

type CommentItemProps = {
	comment: CommentType;
};

function CommentItem({ comment }: CommentItemProps): React.ReactElement {
	const { content, author, date_commented } = comment;
	const { full_name, _id: userid } = author;
	const [isLike, setIsLike] = React.useState(false);

	return (
		<div className='commentItemContainer mx-4'>
			<div className='bg-grey rounded-2xl	p-1 pl-2'>
				<UserLinkText
					userid={userid}
					full_name={full_name}
					flag='comment'
				/>
				<p>{content}</p>
			</div>

			<div className='flex flex-wrap likeContainer ml-2'>
				<p
					className='cursor-pointer'
					onClick={() => setIsLike(!isLike)}
				>
					{isLike ? 'Unlike' : 'Like'}
				</p>
				<p className='hover:underline text-darkGrey font-medium text-sm'>
					{date_commented}
				</p>
			</div>
		</div>
	);
}

export default CommentItem;
