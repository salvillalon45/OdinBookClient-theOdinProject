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
		return (
			<div className='usersToSendFriendRequestsContainer mt-6'>
				<BoldText
					text='Pending Friend Requests'
					greyFlag='text-darkGrey'
				/>

				<HorizontalLine />

				{ShowComponentBasedOnData(
					'No friend requests made yet. Go send some requests :)',
					<div className='flex flex-col gap-x-4 gap-y-6 mt-4 sm:w-1/2 w-10/12 m-auto p-2'>
						{createUserToSendFriendRequestsItems()}
					</div>,
					users_to_send_friend_requests
				)}
			</div>
		);
	}

	return <>{showUsersToSendFriendRequestsContent()}</>;
}

export default UserToSendFriendRequests;
