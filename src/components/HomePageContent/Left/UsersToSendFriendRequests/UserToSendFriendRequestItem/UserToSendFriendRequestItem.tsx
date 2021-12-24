// React & SWR
import React from 'react';
import { useSWRConfig } from 'swr';
import ThemeContext from '../../../../../context/ThemeContext';

// Components
import BoldText from '../../../../Reusable/BoldText';
import Button from '../../../../Reusable/Button';

// Utils
import { executeRESTMethod, useUserByID } from '../../../../../libs/apiUtils';
import { getToken } from '../../../../../libs/authUtils';
import { UserType } from '../../../../../libs/types';
import {
	checkNonFriendHasBeenSendFriendRequest,
	getUserId
} from '../../../../../libs/utils';
import getComponentBasedOnState from '../../../../Reusable/getComponentBasedOnState';

type FriendRequestItemProps = {
	user_to_send_friend_request: UserType;
};

function UserToSendFriendRequestItem({
	user_to_send_friend_request
}: FriendRequestItemProps) {
	const { mutate } = useSWRConfig();
	// const contextValue = React.useContext(ThemeContext);
	// const { user } = contextValue;
	// const { _id: userid } = user;
	const userid = getUserId();
	const { _id: requestedFriendUserId } = user_to_send_friend_request;
	const {
		userData: userThatFriendRequestWasSentTo,
		isLoading,
		errorsData
	} = useUserByID(user_to_send_friend_request._id, getToken());
	const {
		userData: currentUser,
		isLoading: isLoadingCurrentUser,
		errorsData: errorsDataCurrentUser
	} = useUserByID(userid, getToken());

	async function handleSendFriendRequest(): Promise<void> {
		await executeRESTMethod('post', `friend-request`, getToken(), {
			userid,
			requestedFriendUserId
		});
		await mutate([
			`${process.env.GATSBY_ODIN_BOOK}/users/${user_to_send_friend_request._id}`,
			getToken()
		]);
	}

	async function handleWithdrawFriendRequest(): Promise<void> {
		await executeRESTMethod(
			'delete',
			`friend-request/withdraw`,
			getToken(),
			{
				userid,
				requestedFriendUserId
			}
		);
		await mutate([
			`${process.env.GATSBY_ODIN_BOOK}/users/${user_to_send_friend_request._id}`,
			getToken()
		]);
	}

	function showUserToSendFriendRequestItem() {
		let buttonMessage = '';
		let buttonAction;
		let color = '';

		if (
			checkNonFriendHasBeenSendFriendRequest(
				userThatFriendRequestWasSentTo.user,
				currentUser.user
			)
		) {
			buttonMessage = 'Withdraw';
			buttonAction = handleWithdrawFriendRequest;
			color = 'bg-red';
		} else {
			buttonMessage = 'Add Friend';
			buttonAction = handleSendFriendRequest;
			color = 'bg-blue';
		}

		return (
			<div className='items-center text-center p-2 bg-white max-w-sm rounded overflow-hidden shadow-md'>
				<BoldText text={user_to_send_friend_request.full_name} />

				<Button
					color={color}
					buttonAction={buttonAction}
					buttonMessage={buttonMessage}
				/>
			</div>
		);
	}

	function showComponentBasedOnState(): React.ReactNode {
		const result = getComponentBasedOnState(errorsData, isLoading);
		const resultCurrentUser = getComponentBasedOnState(
			errorsDataCurrentUser,
			isLoadingCurrentUser
		);

		if (!!result) {
			return result;
		}

		if (!!resultCurrentUser) {
			return resultCurrentUser;
		}

		// else {
		return <>{showUserToSendFriendRequestItem()}</>;
		// }
	}

	return <>{showComponentBasedOnState()}</>;
}

export default UserToSendFriendRequestItem;
