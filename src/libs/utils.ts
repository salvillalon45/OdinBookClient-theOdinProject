function formatFriendsText(friends: string[]): string {
	let text: string = 'friend';

	if (friends.length > 1) {
		text = 'friends';
	}

	return `${friends.length} ${text}`;
}

function getPostById(posts, postIdToFind: string) {
	return posts?.find((post) => post._id === postIdToFind);
}

function getCommentById(
	posts: string,
	postIdToFind: string,
	commentIdToFind: string
) {
	const post = posts?.find((post) => post._id === postIdToFind);
	return post.comments.find((comment) => comment._id === commentIdToFind);
}

export { getCommentById, formatFriendsText, getPostById };
