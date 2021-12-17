import React from 'react';
import Temp from '../../../images/icon.png';

type UserProfileImageProps = {
	profile_pic_url: string;
};

function UserProfileImage({ profile_pic_url }: UserProfileImageProps) {
	const userProfileImage = profile_pic_url ? (
		<img src={Temp} className='h-24' />
	) : (
		<i className='text-8xl bi bi-person-circle' />
	);

	return userProfileImage;
}

export default UserProfileImage;
