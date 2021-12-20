// React
import React from 'react';

// Components
import PendingFriendRequestItem from './PendingFriendRequestItem';
import HorizontalLine from '../../../Reusable/HorizontalLine';
import BoldText from '../../../Reusable/BoldText';

// Utils
import { UserType } from '../../../../libs/types';
import ShowComponentBasedOnData from '../../../Reusable/ShowComponentBasedOnData';

type FriendRequestsProps = {
	friend_requests: UserType[];
};

function PendingFriendRequests({
	friend_requests
}: FriendRequestsProps): React.ReactElement {
	function createPendingFriendRequestItems(): React.ReactNode {
		return friend_requests.map((friend_request) => {
			return <PendingFriendRequestItem friend_request={friend_request} />;
		});
	}

	function showPendingFriendRequestsContent(): React.ReactNode {
		return (
			<div className='friendRequestsContainer mt-6'>
				<BoldText
					text='Pending Friend Requests'
					greyFlag='text-darkGrey'
				/>

				<HorizontalLine />

				{ShowComponentBasedOnData(
					'No pending friend requests',
					<div className='flex flex-col gap-x-4 gap-y-6 mt-4 w-10/12 m-auto p-2'>
						{createPendingFriendRequestItems()}
					</div>,
					friend_requests
				)}
			</div>
		);
	}

	return <>{showPendingFriendRequestsContent()}</>;
}

export default PendingFriendRequests;
