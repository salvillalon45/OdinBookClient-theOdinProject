// React & SWR
import React from 'react';
import { useSWRConfig } from 'swr';
import ThemeContext from '../../../../../context/ThemeContext';

// Components
import Button from '../../../../Reusable/Button';
import BoldText from '../../../../Reusable/BoldText';

// Utils
import { executeRESTMethod, useUserByID } from '../../../../../libs/apiUtils';
import { getToken } from '../../../../../libs/authUtils';
import { UserType } from '../../../../../libs/types';
import { getPendingFriendRequestById } from '../../../../../libs/utils';
import getComponentBasedOnState from '../../../../Reusable/getComponentBasedOnState';

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

	async function handleAcceptFriendRequest(): Promise<void> {
		await executeRESTMethod('put', `friend-request`, getToken(), {
			userid,
			userToAcceptUserId: pendingFriendRequestId
		});
		await mutate([
			`${process.env.GATSBY_ODIN_BOOK}/users/${userid}`,
			getToken()
		]);
	}

	async function handleDeclineFriendRequest(): Promise<void> {
		await executeRESTMethod(
			'delete',
			`friend-request/decline`,
			getToken(),
			{
				userid,
				userToDeclineUserId: pendingFriendRequestId
			}
		);
		await mutate([
			`${process.env.GATSBY_ODIN_BOOK}/users/${userid}`,
			getToken()
		]);
	}

	function showComponentBasedOnState(): React.ReactNode {
		const result = getComponentBasedOnState(errorsData, isLoading);
		if (!!result) {
			return result;
		} else {
			const { full_name } = getPendingFriendRequestById(
				userData.user.friend_requests,
				pendingFriendRequestId
			);
			return (
				<div className='items-center text-center p-2 bg-white max-w-sm rounded overflow-hidden shadow-md'>
					<BoldText text={full_name} />

					<div>
						<Button
							color='bg-blue'
							width='w-full'
							buttonAction={handleAcceptFriendRequest}
							buttonMessage='Confirm'
						/>

						<Button
							color='bg-grey'
							width='w-full'
							buttonAction={handleDeclineFriendRequest}
							buttonMessage='Delete'
						/>
					</div>
				</div>
			);
		}
	}

	return <>{showComponentBasedOnState()}</>;
}

export default PendingFriendRequestItem;
