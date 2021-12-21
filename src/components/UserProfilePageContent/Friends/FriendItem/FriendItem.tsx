// React
import React from 'react';

// Components
import UserLinkText from '../../../Reusable/UserLinkText';

// Utils
import { UserType } from '../../../../libs/types';

type FriendItemProps = {
	friend: UserType;
};

function FriendItem({ friend }: FriendItemProps): React.ReactElement {
	const { full_name, _id: userid, profile_pic_url } = friend;

	return (
		<div className='flex items-center bg-white max-w-sm rounded overflow-hidden shadow-md p-4'>
			<div className='px-4'>
				{profile_pic_url ? (
					<img
						src={profile_pic_url}
						className='h-24 rounded-pictureBorderRadius'
					/>
				) : (
					<i className='text-6xl bi bi-person-circle' />
				)}
			</div>

			<div>
				<UserLinkText userid={userid} full_name={full_name} flag='' />
			</div>
		</div>
	);
}

export default FriendItem;
