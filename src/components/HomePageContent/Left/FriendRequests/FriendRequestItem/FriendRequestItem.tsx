import React from 'react';
import { UserType } from '../../../../../libs/types';

type FriendRequestItemProps = {
	friend_request: UserType;
};

function FriendRequestItem({ friend_request }: FriendRequestItemProps) {
	return (
		<div>
			<p>Send a friend request to</p>
			<p>{friend_request.full_name}</p>
		</div>
	);
}

export default FriendRequestItem;
