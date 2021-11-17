import React from 'react';
import Posts from './Posts';

function MiddleContent(): React.ReactElement {
	return (
		<div className='middleContentContainer col-span-2 m-auto'>
			<p className='text-darkGrey pl-2 font-medium text-lg'>Timeline</p>

			<hr className='bg-darkGrey ml-1' />

			<Posts />
		</div>
	);
}

export default MiddleContent;
