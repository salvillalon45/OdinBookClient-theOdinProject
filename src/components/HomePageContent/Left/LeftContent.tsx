// React & Gatsby
import React from 'react';
import { Link } from 'gatsby';
import ThemeContext from '../../../context/ThemeContext';

// Components
import HorizontalLine from '../../Reusable/HorizontalLine';
import BoldText from '../../Reusable/BoldText';
import UserToSendFriendRequests from './UsersToSendFriendRequests';

// Utils
import { getToken } from '../../../libs/authUtils';
import { useUserByID, useUsers } from '../../../libs/apiUtils';
import { getNonFriendsOfUser, getUserId } from '../../../libs/utils';
import getComponentBasedOnState from '../../Reusable/getComponentBasedOnState';

function LeftContent(): React.ReactElement {
	const contextValue = React.useContext(ThemeContext);
	const userid = getUserId();
	const { usersData, isLoading, errorsData } = useUsers(getToken());
	const {
		userData: currentUser,
		isLoading: isLoadingCurrentUser,
		errorsData: errorsDataCurrentUser
	} = useUserByID(userid, getToken());

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

		const usersToRequest = getNonFriendsOfUser(usersData, userid);
		return (
			<div className='leftContentContainer'>
				<div className='top-16 sticky'>
					<BoldText text='Your Dashboard' greyFlag='text-darkGrey' />

					<HorizontalLine />

					<Link to={`/home/user/?${userid}`}>
						<div className='flex hover:bg-greyHover rounded-lg p-1 pl-2 ml-2 my-4'>
							<p className='text-lg'>
								<i className='bi bi-person-circle' />
							</p>

							<BoldText text={currentUser.user.full_name} />
						</div>
					</Link>

					<Link
						to={`/home/user/?${userid}`}
						state={{ showTabContent: 3 }}
					>
						<div className='flex hover:bg-greyHover rounded-lg p-1 pl-2 ml-2 my-4'>
							<p className='text-lg'>
								<i className='bi bi-people-fill' />
							</p>

							<BoldText text='Friends' />
						</div>
					</Link>

					<UserToSendFriendRequests
						users_to_send_friend_requests={usersToRequest}
					/>
				</div>
			</div>
		);
	}

	return <>{showComponentBasedOnState()}</>;
}

export default LeftContent;
