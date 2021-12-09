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
	const { userData, isLoading, errorsData } = useUserByID(
		contextValue.user._id,
		getToken()
	);

	function showComponentBasedOnState(): React.ReactNode {
		if (errorsData) {
			return <Errors errorsData={errorsData} />;
		} else if (isLoading) {
			return <IsLoading isLoading={isLoading} />;
		} else {
			const { friend_requests } = userData.user;
			return (
				<div className='rightContentContainer'>
					<div className='top-16 sticky'>
						<Contacts />

						<PendingFriendRequests
							friend_requests={friend_requests}
						/>
					</div>
				</div>
			);
		}
	}

	return <>{showComponentBasedOnState()}</>;
}

export default RightContent;
