import { Link } from 'gatsby';
import React from 'react';
import Logo from '../../../../images/logo.png';
import { UserType } from '../../../../libs/types';
import UserLinkText from '../../../Reusable/UserLinkText';

type FriendItemProps = {
	friend: UserType;
};

function FriendItem({ friend }: FriendItemProps): React.ReactElement {
	const { full_name, _id: userid } = friend;

	return (
		<div className='flex items-center bg-white max-w-sm rounded overflow-hidden shadow-md'>
			<img src={Logo} className='h-20' />

			<div>
				<UserLinkText userid={userid} full_name={full_name} flag='' />
			</div>
		</div>
	);
}

export default FriendItem;
