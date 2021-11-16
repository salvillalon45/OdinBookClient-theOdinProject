import React from 'react';
import Posts from './Posts';

function MiddleContent(): React.ReactElement {
	return (
		<div className='middleContentContainer col-span-2'>
			<Posts />
		</div>
	);
}

export default MiddleContent;
