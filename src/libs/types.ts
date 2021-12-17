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
	_id: string;
};

type ErrorType = {
	context: string;
	message: string;
	errors: string[];
};

type ImageType = {
	image_name: string;
	image_data: File;
};

type AllPostsDataType = {
	message: string;
	userPosts: PostType[];
	posts: PostType[];
};

type UsePostsHookReturnType = {
	allPosts: {
		message: string;
		userPosts: PostType[];
		posts: PostType[];
	};
	isLoading: boolean;
	errorsData: ErrorType;
};

type UseUserByIDHookReturnType = {
	userData: {
		message: string;
		user: UserType;
	};
	isLoading: boolean;
	errorsData: ErrorType;
};

type UseUsersHookReturnType = {
	usersData: {
		message: string;
		users: UserType[];
	};
	isLoading: boolean;
	errorsData: ErrorType;
};

type UsersData = {
	message: string;
	users: UserType[];
};

export {
	UsersData,
	ErrorType,
	UsePostsHookReturnType,
	UseUserByIDHookReturnType,
	UseUsersHookReturnType,
	CommentType,
	PostType,
	UserType,
	AllPostsDataType,
	ImageType
};
