import React from 'react';
import { Link } from 'gatsby';
import ThemeContext from '../../../context/ThemeContext';
import { getToken } from '../../../libs/authUtils';
import { useUsers } from '../../../libs/apiUtils';
import FriendRequests from './FriendRequests';

function LeftContent(): React.ReactElement {
	const contextValue = React.useContext(ThemeContext);
	const { user } = contextValue;
	const { first_name, last_name, _id } = user;

	const { usersData, isLoading, errorsData } = useUsers(getToken());

	// Only show the users I am not friend with
	// This means go into all the users
	// Filter out the ones the current user is already friends with
	// This mean use the .filter with a condition saying
	// Loop over all users
	// For this function we will need
	// 	// current user, use the useUserById to get most update user
	// 	// allUsers from useUser hook
	// for each user
	// 	check the userid of the user
	// if the userid is included in the array of friends in the current user,
	// 	then we do not want it
	// if the userid is not included,
	// 	then that is not a friend and we want to show it
	// Then get the remaning friends
	return (
		<div className='leftContentContainer'>
			<div className='top-16 sticky'>
				<p className='text-darkGrey pl-2 font-medium text-lg'>
					Your Dashboard
				</p>

				<hr className='bg-darkGrey ml-1' />

				<Link to={`/home/user/${_id}`}>
					<div className='flex hover:bg-greyHover rounded-lg p-1 pl-2 ml-2'>
						<p className='text-lg'>
							<i className='bi bi-person-circle' />
						</p>
						<p className='pl-2 font-medium text-lg'>
							{`${first_name} ${last_name}`}
						</p>
					</div>
				</Link>

				<Link to='#'>
					<div className='flex hover:bg-greyHover rounded-lg p-1 pl-2 ml-2'>
						<p className='text-lg'>
							<i className='bi bi-people-fill' />
						</p>
						<p className='pl-2 font-medium text-lg'>Friends</p>
					</div>
				</Link>

				<FriendRequests friend_requests={friend_requests} />
			</div>
		</div>
	);
}

export default LeftContent;
