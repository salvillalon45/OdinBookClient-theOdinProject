import React from 'react';
import { useSWRConfig } from 'swr';
import ThemeContext from '../../../../../context/ThemeContext';
import { executeRESTMethod, useUserByID } from '../../../../../libs/apiUtils';
import { getToken } from '../../../../../libs/authUtils';
import { UsersData, UserType } from '../../../../../libs/types';
import Button from '../../../../Reusable/Button';

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
		userData,
		isLoading: isLoadingUserByID,
		errorsData: errorsDataUserByID
	} = useUserByID(contextValue.user._id, getToken());
	console.log({ userData });

	function checkNonFriendHasBeenSendFriendRequest(
		nonFriendUserId: string,
		loggedInUser: UserType
	) {
		const result = loggedInUser.friend_requests.find(
			(user_to_send_friend_request: UserType) =>
				user_to_send_friend_request._id === nonFriendUserId
		);
		// console.log({ result });
		return result ? true : false;
	}

	if (!isLoadingUserByID && userData) {
	}

	async function handleSendFriendRequest(): Promise<void> {
		const { _id: requestedFriendUserId } = user_to_send_friend_request;

		await executeRESTMethod('post', `friend-request`, getToken(), {
			userid,
			requestedFriendUserId
		});
		await mutate([
			`${process.env.GATSBY_ODIN_BOOK}/users/${userid}`,
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
			`${process.env.GATSBY_ODIN_BOOK}/users/${userid}`,
			getToken()
		]);
	}

	function showUserToSendFriendRequestItem() {
		let buttonMessage = '';
		let buttonAction;
		let color = '';

		if (
			checkNonFriendHasBeenSendFriendRequest(
				user_to_send_friend_request._id,
				userData.user
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

	return <>{showUserToSendFriendRequestItem()}</>;
}

export default UserToSendFriendRequestItem;
