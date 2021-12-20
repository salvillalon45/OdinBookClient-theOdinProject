// React
import React from 'react';

type NoContentAvailableProps = {
	message: string;
};

function NoContentAvailable({ message }: NoContentAvailableProps) {
	return (
		<div className='text-center p-4	'>
			<p>{message}</p>
		</div>
	);
}

export default NoContentAvailable;
