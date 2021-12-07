import React from 'react';
import { useSWRConfig } from 'swr';
import ThemeContext from '../../../../../context/ThemeContext';
import { executeRESTMethod, useUserByID } from '../../../../../libs/apiUtils';
import { getToken } from '../../../../../libs/authUtils';
import { UserType } from '../../../../../libs/types';
import { checkNonFriendHasBeenSendFriendRequest } from '../../../../../libs/utils';
import Button from '../../../../Reusable/Button';
import Errors from '../../../../Reusable/Errors';
import IsLoading from '../../../../Reusable/IsLoading';

type FriendRequestItemProps = {
	user_to_send_friend_request: UserType;
};

function UserToSendFriendRequestItem({
	user_to_send_friend_request
}: FriendRequestItemProps) {
	const { mutate } = useSWRConfig();
	const contextValue = React.useContext(ThemeContext);
	const { user } = contextValue;
	const { _id: userid } = user;
	const {
		userData: userThatFriendRequestWasSentTo,
		isLoading,
		errorsData
	} = useUserByID(user_to_send_friend_request._id, getToken());

	async function handleSendFriendRequest(): Promise<void> {
		const { _id: requestedFriendUserId } = user_to_send_friend_request;
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
		const { _id: requestedFriendUserId } = user_to_send_friend_request;
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
				user
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
			<div className='items-center bg-white max-w-sm rounded overflow-hidden shadow-md'>
				<p>{user_to_send_friend_request.full_name}</p>
				<Button
					color={color}
					buttonAction={buttonAction}
					buttonMessage={buttonMessage}
				/>
			</div>
		);
	}

	function showComponentBasedOnState(): React.ReactNode {
		if (errorsData) {
			return <Errors errorsData={errorsData} />;
		} else if (isLoading) {
			return <IsLoading isLoading={isLoading} />;
		} else {
			return <>{showUserToSendFriendRequestItem()}</>;
		}
	}

	return <>{showComponentBasedOnState()}</>;
}

export default UserToSendFriendRequestItem;