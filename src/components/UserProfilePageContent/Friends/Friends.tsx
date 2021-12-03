import React from 'react';
import { UserType } from '../../../libs/types';
import FriendItem from './FriendItem';

type FriendsProps = {
	friends: UserType[];
};

function Friends({ friends }: FriendsProps): React.ReactElement {
	function createFriendItems(): React.ReactNode {
		return friends.map((friend) => {
			return <FriendItem friend={friend} />;
		});
	}

	function showFriendsContent() {
		if (friends.length === 0) {
			return (
				<div className='text-center p-4	'>
					<p>No friends made yet. Go make some friends :)</p>
				</div>
			);
		} else {
			return (
				<div className='friendsContainer'>
					<div className='tabHeaderContainer w-11/12 m-auto'>
						<p className='text-darkGrey font-medium text-lg'>
							Your Friends
						</p>

						<hr className='bg-darkGrey mt-2 h-0.5' />
					</div>

					<div className='friendsGridWrapperContainer bg-white rounded grid md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-6 mt-4 w-10/12 m-auto p-2'>
						{createFriendItems()}
					</div>
				</div>
			);
		}
	}

	return <>{showFriendsContent()}</>;
}

export default Friends;
