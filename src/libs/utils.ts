import React from 'react';
import Errors from '../components/Reusable/Errors';
import IsLoading from '../components/Reusable/IsLoading';
import { PostType } from './types';

function formatFriendsText(friends: string[]): string {
	let text: string = 'friend';

	if (friends.length > 1) {
		text = 'friends';
	}

	return `${friends.length} ${text}`;
}

function getPostById(posts, postIdToFind: string): PostType {
	return posts.find((post) => post._id === postIdToFind);
}

function getCommentById(post: PostType, commentIdToFind: string): PostType {
	return post.comments.find((comment) => comment._id === commentIdToFind);
}

function checkStateOfLike(data, userid: string): boolean {
	const found = data.likes.find((like) => like._id === userid);
	return found ? true : false;
}

type ErrorMyClass = InstanceType<typeof Errors>;

function ShowComponentBasedOnState(
	resultComponent: React.ReactNode,
	isLoading: React.ReactNode,
	errorsData: React.ReactNode
): React.ReactNode {
	if (errorsData) {
		console.log('ERRORS CP');

		// return (
		// 	<>
		// 		<Error errorsData={errorsData} />
		// 	</>
		// );
		return resultComponent;
	} else if (isLoading) {
		console.log('IS LOADING CP');

		// return <IsLoading isLoading={ isLoading } />;
		return resultComponent;
	} else {
		console.log('RESULT CP');
		return resultComponent;
	}
}

export { checkStateOfLike, getCommentById, formatFriendsText, getPostById };
