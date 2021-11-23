import React from 'react';
import Logo from '../../../../images/logo.png';

function FriendItem(): React.ReactElement {
	return (
		<div className='bg-white max-w-sm rounded overflow-hidden shadow-sm'>
			<img src={Logo} className='h-20' />
			<p>Friend 1</p>
		</div>
	);
}

export default FriendItem;
