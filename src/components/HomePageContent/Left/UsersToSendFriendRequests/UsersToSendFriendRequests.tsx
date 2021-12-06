import React from 'react';
import FriendRequestItem from './UserToSendFriendRequestItem';
import { UserType } from '../../../../libs/types';

type FriendRequestsProps = {
	users_to_send_friend_requests: UserType[];
};

function UserToSendFriendRequests({
	users_to_send_friend_requests
}: FriendRequestsProps): React.ReactElement {
	function createFriendRequestItems(): React.ReactNode {
		return users_to_send_friend_requests.map(
			(user_to_send_friend_request) => {
				return (
					<FriendRequestItem
						user_to_send_friend_request={
							user_to_send_friend_request
						}
					/>
				);
			}
		);
	}

	function showUsersToSendFriendRequestsContent(): React.ReactNode {
		if (users_to_send_friend_requests.length === 0) {
			return (
				<div className='text-center p-4	'>
					<p>No friend requests made yet. Go send some requests :)</p>
				</div>
			);
		} else {
			return (
				<div className='friendRequestsContainer mt-6'>
					<p className='text-darkGrey pl-2 font-medium text-lg'>
						New Friends To Add
					</p>

					<hr className='bg-darkGrey ml-1' />

					<div className='flex flex-col gap-x-4 gap-y-6 mt-4 w-10/12 m-auto p-2'>
						{createFriendRequestItems()}
					</div>
				</div>
			);
		}
	}

	return <>{showUsersToSendFriendRequestsContent()}</>;
}

export default UserToSendFriendRequests;
