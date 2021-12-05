import { CommentType, PostType, UsersData, UserType } from './types';

const authorDefault: UserType = {
	_id: '',
	first_name: '',
	friend_requests: [],
	friends: [],
	last_name: '',
	profile_pic_url: '',
	timestamp: '',
	username: '',
	full_name: '',
	date_joined: ''
};

const postDefault: PostType = {
	attached_picture: '',
	content: '',
	timestamp: '',
	date_posted: '',
	_id: '',
	comments: [],
	likes: [],
	author: authorDefault
};

const commentDefault: CommentType = {
	timestamp: '',
	date_commented: '',
	content: '',
	author: authorDefault,
	likes: [],
	post_ref: postDefault,
	_id: ''
};

function isEmptyObject(data: PostType | CommentType) {
	return Object.values(data).every(function (x) {
		// console.log({ x }, x.length);
		return x.length === 0; // or just "return o[x];" for falsy values
	});
}

function getUserIDS(data: UserType[]) {
	return data.map((user: UserType) => user._id);
}

function getNonFriendsOfUser(usersData: UsersData, loggedInUserID: string) {
	return usersData.users.filter((user: UserType) => {
		const userIDFromUserFriends = getUserIDS(user.friends);
		// console.log('What is check');
		// console.log('userid from current user');
		// console.log({ loggedInUserID });
		// console.log('userid from all users');
		// console.log(user._id);

		if (
			!userIDFromUserFriends.includes(loggedInUserID) &&
			loggedInUserID !== user._id
		) {
			return user;
		}
	});
}

function formatLikesText(likes: UserType[]) {
	return likes.length > 1 || likes.length === 0 ? 'likes' : 'like';
}

function formatCommentsText(comments: CommentType[]) {
	return comments.length > 1 || comments.length === 0
		? 'comments'
		: 'comment';
}

function formatFriendsText(friends: string[]): string {
	let text: string = 'friend';

	if (friends.length > 1) {
		text = 'friends';
	}

	return `${friends.length} ${text}`;
}

function getPostById(posts: PostType[], postIdToFind: string): PostType {
	return (
		posts.find((post: PostType) => post._id === postIdToFind) ?? postDefault
	);
}

function getCommentById(post: PostType, commentIdToFind: string): CommentType {
	return (
		post.comments.find(
			(comment: CommentType) => comment._id === commentIdToFind
		) ?? commentDefault
	);
}

function checkStateOfLike(
	data: PostType | CommentType,
	userid: string
): boolean {
	const found = data.likes.find((like: UserType) => like._id === userid);
	return found ? true : false;
}

export {
	isEmptyObject,
	checkStateOfLike,
	getCommentById,
	getPostById,
	formatFriendsText,
	formatLikesText,
	formatCommentsText,
	getNonFriendsOfUser
};
