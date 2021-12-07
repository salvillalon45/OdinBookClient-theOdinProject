import React from 'react';
import { useSWRConfig } from 'swr';
import ThemeContext from '../../../../../context/ThemeContext';
import { executeRESTMethod, useUserByID } from '../../../../../libs/apiUtils';
import { getToken } from '../../../../../libs/authUtils';
import { UsersData, UserType } from '../../../../../libs/types';
import { getPendingFriendRequestById } from '../../../../../libs/utils';
import Button from '../../../../Reusable/Button';
import Errors from '../../../../Reusable/Errors';
import IsLoading from '../../../../Reusable/IsLoading';

type FriendRequestItemProps = {
	friend_request: UserType;
};

function PendingFriendRequestItem({ friend_request }: FriendRequestItemProps) {
	const { mutate } = useSWRConfig();
	const contextValue = React.useContext(ThemeContext);
	const { user } = contextValue;
	const { _id: userid } = user;
	const { _id: pendingFriendRequestId } = friend_request;
	const { userData, isLoading, errorsData } = useUserByID(userid, getToken());

	function showComponentBasedOnState(): React.ReactNode {
		if (errorsData) {
			return <Errors errorsData={errorsData} />;
		} else if (isLoading) {
			return <IsLoading isLoading={isLoading} />;
		} else {
			const { full_name } = getPendingFriendRequestById(
				userData.user.friend_requests,
				pendingFriendRequestId
			);
			return (
				<div>
					<p>{full_name}</p>
				</div>
			);
		}
	}

	return <>{showComponentBasedOnState()}</>;
}

export default PendingFriendRequestItem;
