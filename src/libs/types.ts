type UserType = {
	_id: string;
	first_name: string;
	friend_requests: [];
	friends: [string];
	last_name: string;
	profile_pic_url: string;
	timestamp: string;
	username: string;
};

export { UserType };
