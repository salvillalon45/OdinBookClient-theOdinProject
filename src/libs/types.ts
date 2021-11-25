type UserType = {
	_id: string;
	first_name: string;
	friend_requests: [];
	friends: [];
	last_name: string;
	profile_pic_url: string;
	timestamp: string;
	username: string;
	full_name: string;
	date_joined: string;
};

type PostType = {
	attached_picture: string;
	content: string;
	timestamp: string;
	date_posted: string;
	_id: string;
	author: UserType;
	comments: CommentType[];
	likes: UserType[];
};

type CommentType = {
	timestamp: string;
	date_commented: string;
	content: string;
	author: UserType;
	likes: UserType[];
	post_ref: PostType;
};

type ErrorType = {
	context: string;
	message: string;
	errors: string[];
};

type UsePostHookReturnType = {
	allPosts: {
		message: string;
		userPosts: PostType[];
		posts: PostType[];
	};
	isLoading: boolean;
	isError: ErrorType[];
};

export { ErrorType, UsePostHookReturnType, CommentType, PostType, UserType };
