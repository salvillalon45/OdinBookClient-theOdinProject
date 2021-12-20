// React
import React from 'react';

// Components
import UserToSendFriendRequestItem from './UserToSendFriendRequestItem';
import HorizontalLine from '../../../Reusable/HorizontalLine';
import BoldText from '../../../Reusable/BoldText';

// Utils
import { UserType } from '../../../../libs/types';
import ShowComponentBasedOnData from '../../../Reusable/ShowComponentBasedOnData';

type FriendRequestsProps = {
	users_to_send_friend_requests: UserType[];
};

function UserToSendFriendRequests({
	users_to_send_friend_requests
}: FriendRequestsProps): React.ReactElement {
	function createUserToSendFriendRequestsItems(): React.ReactNode {
		return users_to_send_friend_requests.map(
			(user_to_send_friend_request, index) => {
				return (
					<UserToSendFriendRequestItem
						key={index}
						user_to_send_friend_request={
							user_to_send_friend_request
						}
					/>
				);
			}
		);
	}

	function showUsersToSendFriendRequestsContent(): React.ReactNode {
		return ShowComponentBasedOnData(
			'No friend requests made yet. Go send some requests :)',
			<div className='friendRequestsContainer mt-6'>
				<BoldText text='New Friends To Add' greyFlag='text-darkGrey' />

				<HorizontalLine />

				<div className='flex flex-col gap-x-4 gap-y-6 mt-4 sm:w-1/2 w-10/12 m-auto p-2'>
					{createUserToSendFriendRequestsItems()}
				</div>
			</div>,
			users_to_send_friend_requests
		);
	}

	return <>{showUsersToSendFriendRequestsContent()}</>;
}

export default UserToSendFriendRequests;
