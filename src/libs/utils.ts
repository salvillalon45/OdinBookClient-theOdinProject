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

export { checkStateOfLike, getCommentById, formatFriendsText, getPostById };
