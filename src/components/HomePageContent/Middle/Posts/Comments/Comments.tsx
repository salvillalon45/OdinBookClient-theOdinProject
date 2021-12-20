// React
import React from 'react';

// Components
import CommentItem from './CommentItem';

// Utils
import { CommentType } from '../../../../../libs/types';

type CommentsProps = {
	comments: CommentType[];
};

function Comments({ comments }: CommentsProps): React.ReactElement {
	function createCommentItems(): React.ReactNode {
		return comments.map((comment, index) => {
			return <CommentItem key={index} comment={comment} />;
		});
	}

	return (
		<div className='commentsContainers flex flex-col gap-4 mt-4 mb-4'>
			{createCommentItems()}
		</div>
	);
}

export default Comments;
