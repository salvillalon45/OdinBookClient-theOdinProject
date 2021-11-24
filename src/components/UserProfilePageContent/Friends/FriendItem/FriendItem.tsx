import { Link } from 'gatsby';
import React from 'react';
import Logo from '../../../../images/logo.png';
import { UserType } from '../../../../libs/types';

type FriendItemProps = {
	friend: UserType;
};

function FriendItem({ friend }: FriendItemProps): React.ReactElement {
	const { full_name, _id } = friend;

	return (
		<div className='flex items-center bg-white max-w-sm rounded overflow-hidden shadow-md'>
			<img src={Logo} className='h-20' />

			<div>
				<Link to={`/home/user/${_id}`}>
					<p className='hover:underline text-md font-medium text-black'>
						{full_name}
					</p>
				</Link>
			</div>
		</div>
	);
}

export default FriendItem;
