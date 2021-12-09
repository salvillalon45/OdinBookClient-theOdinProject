import React from 'react';
import { Link } from 'gatsby';
import ThemeContext from '../../../context/ThemeContext';
import { getToken } from '../../../libs/authUtils';
import { useUserByID, useUsers } from '../../../libs/apiUtils';
import FriendRequests from './UsersToSendFriendRequests';
import { UserType } from '../../../libs/types';
import { getNonFriendsOfUser } from '../../../libs/utils';
import HorizontalLine from '../../Reusable/HorizontalLine';
import BoldText from '../../Reusable/BoldText';

function LeftContent(): React.ReactElement {
	const contextValue = React.useContext(ThemeContext);
	const { user } = contextValue;
	const { first_name, last_name, _id } = user;

	const {
		usersData,
		isLoading: isLoadingUsers,
		errorsData: errorsDataUsers
	} = useUsers(getToken());
	const {
		userData,
		isLoading: isLoadingUserByID,
		errorsData: errorsDataUserByID
	} = useUserByID(contextValue.user._id, getToken());

	let usersToRequest: UserType[] = [];

	if (!isLoadingUserByID && !isLoadingUsers) {
		usersToRequest = getNonFriendsOfUser(usersData, userData.user._id);
	}

	return (
		<div className='leftContentContainer'>
			<div className='top-16 sticky'>
				<BoldText text='Your Dashboard' greyFlag='text-darkGrey' />

				<HorizontalLine />

				<Link to={`/home/user/${_id}`}>
					<div className='flex hover:bg-greyHover rounded-lg p-1 pl-2 ml-2 my-4'>
						<p className='text-lg'>
							<i className='bi bi-person-circle' />
						</p>

						<BoldText text={user.full_name} />
					</div>
				</Link>

				<Link to={`/home/user/${_id}`} state={{ showTabContent: 3 }}>
					<div className='flex hover:bg-greyHover rounded-lg p-1 pl-2 ml-2 my-4'>
						<p className='text-lg'>
							<i className='bi bi-people-fill' />
						</p>

						<BoldText text='Friends' />
					</div>
				</Link>

				<FriendRequests
					users_to_send_friend_requests={usersToRequest}
				/>
			</div>
		</div>
	);
}

export default LeftContent;
