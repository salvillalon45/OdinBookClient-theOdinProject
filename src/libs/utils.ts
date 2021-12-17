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

function checkNonFriendHasBeenSendFriendRequest(
	userThatFriendRequestWasSentTo: UserType,
	loggedInUser: UserType
) {
	const result = userThatFriendRequestWasSentTo.friend_requests.find(
		(user_to_send_friend_request: UserType) =>
			user_to_send_friend_request._id === loggedInUser._id
	);
	return result ? true : false;
}

function getNonFriendsOfUser(usersData: UsersData, loggedInUserID: string) {
	return usersData.users.filter((user: UserType) => {
		const userIDFromUserFriends = getUserIDS(user.friends);
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

function getPendingFriendRequestById(
	friends_requests: UserType[],
	pendingFriendRequestToFind: string
): UserType {
	return (
		friends_requests.find(
			(friends_request: UserType) =>
				friends_request._id === pendingFriendRequestToFind
		) ?? authorDefault
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

function getPosts(posts: PostType[]): PostType[] {
	const result: PostType[] = [];
	posts.forEach((post: PostType) => {
		result.push(post);
	});
	return result;
}

export {
	isEmptyObject,
	checkStateOfLike,
	getCommentById,
	getPostById,
	getPendingFriendRequestById,
	formatFriendsText,
	formatLikesText,
	formatCommentsText,
	getNonFriendsOfUser,
	checkNonFriendHasBeenSendFriendRequest,
	getPosts
};
