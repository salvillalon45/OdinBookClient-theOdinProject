import React from 'react';
import FriendItem from './FriendItem';

function FriendsGrid(): React.ReactElement {
	function createFriendItems(): React.ReactNode {
		return [1, 2, 3, 4, 5].map((index) => {
			return <FriendItem />;
		});
	}

	return (
		<div className='friendsGridContainer'>
			<div className='friendsGridWrapperContainer grid md:grid-cols-3 grid-cols-2 gap-x-4 gap-y-10 mt-8'>
				{createFriendItems()}
			</div>
		</div>
	);
}

export default FriendsGrid;
