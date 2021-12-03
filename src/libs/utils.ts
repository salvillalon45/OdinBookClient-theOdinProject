import React from 'react';
import Errors from '../components/Reusable/Errors';
import IsLoading from '../components/Reusable/IsLoading';
import { CommentType, PostType, UserType } from './types';

function formatFriendsText(friends: string[]): string {
	let text: string = 'friend';

	if (friends.length > 1) {
		text = 'friends';
	}

	return `${friends.length} ${text}`;
}

function getPostById(posts: PostType[], postIdToFind: string): PostType {
	const test: PostType = {
		attached_picture: 
		'';
		content: string;
		timestamp: string;
		date_posted: string;
		_id: string;
		author: UserType;
		comments: CommentType[];
		likes: UserType[];};
	return posts.find((post: PostType) => post._id === postIdToFind) ?? undefined;
}

function getCommentById(post: PostType, commentIdToFind: string): CommentType {
	return post.comments.find(
		(comment: CommentType) => comment._id === commentIdToFind
	);
}

function checkStateOfLike(
	data: PostType | CommentType,
	userid: string
): boolean {
	const found = data.likes.find((like: UserType) => like._id === userid);
	return found ? true : false;
}

export { checkStateOfLike, getCommentById, formatFriendsText, getPostById };
