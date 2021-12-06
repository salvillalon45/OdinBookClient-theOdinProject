import React from 'react';
import ThemeContext from '../../../context/ThemeContext';
import { useUserByID, useUsers } from '../../../libs/apiUtils';
import { getToken } from '../../../libs/authUtils';
import { ErrorType, UserType } from '../../../libs/types';
import Errors from '../../Reusable/Errors';
import IsLoading from '../../Reusable/IsLoading';
import Contacts from './Contacts';
import PendingFriendRequests from './PendingFriendRequests';

function RightContent(): React.ReactElement {
	const contextValue = React.useContext(ThemeContext);
	const { user } = contextValue;
	// const { first_name, last_name, _id } = user;

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

	// if (!isLoadingUserByID && !isLoadingUsers) {
	// 	usersToRequest = getNonFriendsOfUser(usersData, userData.user._id);
	// }

	function showComponentBasedOnState(): React.ReactNode {
		if (errorsData) {
			return <Errors errorsData={errorsData} />;
		} else if (isLoading) {
			return <IsLoading isLoading={isLoading} />;
		} else {
			return (
				<div className='rightContentContainer'>
					<Contacts />

					<PendingFriendRequests friend_requests={usersToRequest} />
				</div>
			);
		}
	}

	return <>{showComponentBasedOnState()}</>;
}

export default RightContent;
