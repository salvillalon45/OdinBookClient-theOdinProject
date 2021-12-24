// React
import React from 'react';
import ThemeContext from '../../../context/ThemeContext';

// Components
import getComponentBasedOnState from '../../Reusable/getComponentBasedOnState';
import Contacts from './Contacts';
import PendingFriendRequests from './PendingFriendRequests';

// Utils
import { useUserByID } from '../../../libs/apiUtils';
import { getToken } from '../../../libs/authUtils';
import { getUserId } from '../../../libs/utils';

function RightContent(): React.ReactElement {
	const contextValue = React.useContext(ThemeContext);
	const { userData, isLoading, errorsData } = useUserByID(
		// contextValue.user._id,
		getUserId(),
		getToken()
	);

	function showComponentBasedOnState(): React.ReactNode {
		const result = getComponentBasedOnState(errorsData, isLoading);
		if (!!result) {
			return result;
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
