import React from 'react';
import FriendRequestItem from './FriendRequestItem';
import { UserType } from '../../../../libs/types';

type FriendRequestsProps = {
	friend_requests: UserType[];
};

function FriendRequests({
	friend_requests
}: FriendRequestsProps): React.ReactElement {
	function createFriendRequestItems(): React.ReactNode {
		return friend_requests.map((friend_request) => {
			return <FriendRequestItem friend_request={friend_request} />;
		});
	}

	function showFriendsContent() {
		if (friend_requests.length === 0) {
			return (
				<div className='text-center p-4	'>
					<p>No friend requests made yet. Go send some requests :)</p>
				</div>
			);
		} else {
			return (
				<div className='friendRequestsContainer'>
					<p className='text-darkGrey pl-2 font-medium text-lg'>
						New Friends To Add
					</p>

					<hr className='bg-darkGrey ml-1' />

					<div className='friendRequestsGridWrapperContainer bg-white rounded grid md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-6 mt-4 w-10/12 m-auto p-2'>
						{createFriendRequestItems()}
					</div>
				</div>
			);
		}
	}

	return <>{showFriendsContent()}</>;
}

export default FriendRequests;
