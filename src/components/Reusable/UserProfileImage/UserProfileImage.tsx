// React
import React from 'react';

type UserProfileImageProps = {
	profile_pic_url: string;
};

function UserProfileImage({ profile_pic_url }: UserProfileImageProps) {
	return profile_pic_url ? (
		<img
			src={profile_pic_url}
			className='h-24 rounded-pictureBorderRadius'
		/>
	) : (
		<i className='text-8xl bi bi-person-circle' />
	);
}

export default UserProfileImage;
