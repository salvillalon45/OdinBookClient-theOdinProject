import React from 'react';
import { useSWRConfig } from 'swr';
import ThemeContext from '../../../../../context/ThemeContext';
import { executeRESTMethod, useUserByID } from '../../../../../libs/apiUtils';
import { getToken } from '../../../../../libs/authUtils';
import { UsersData, UserType } from '../../../../../libs/types';
import Button from '../../../../Reusable/Button';

type FriendRequestItemProps = {
	friend_request: UserType;
};

function FriendRequestItem({ friend_request }: FriendRequestItemProps) {
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
			(friend_request: UserType) => friend_request._id === nonFriendUserId
		);
		console.log({ result });
		return result ? true : false;
	}

	if (!isLoadingUserByID && userData) {
	}

	async function handleSendFriendRequest(): Promise<void> {
		const { _id: requestedFriendUserId } = friend_request;

		await executeRESTMethod('post', `friend-request`, getToken(), {
			userid,
			requestedFriendUserId
		});
		await mutate([
			`${process.env.GATSBY_ODIN_BOOK}/users/${userid}`,
			getToken()
		]);
	}

	function showFriendRequestItem() {
		if (
			checkNonFriendHasBeenSendFriendRequest(
				friend_request._id,
				userData.user
			)
		) {
			return (
				<div className='items-center bg-white max-w-sm rounded overflow-hidden shadow-md'>
					<p>{friend_request.full_name}</p>
					<Button
						color='bg-red'
						// width='w-full'
						// value='log-in'
						buttonAction={() => 'hi'}
						buttonMessage='Withdraw'
					/>
				</div>
			);
		} else {
			return (
				<div className='items-center bg-white max-w-sm rounded overflow-hidden shadow-md'>
					<p>{friend_request.full_name}</p>
					<Button
						color='bg-blue'
						// width='w-full'
						// value='log-in'
						buttonAction={handleSendFriendRequest}
						buttonMessage='Add Friend'
					/>
				</div>
			);
		}
	}

	return <>{showFriendRequestItem()}</>;
}

export default FriendRequestItem;
