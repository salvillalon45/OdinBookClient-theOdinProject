// React
import React from 'react';

// Components
import CircularProgress from '@mui/material/CircularProgress';

function IsLoading(): React.ReactElement {
	return (
		<div className='text-center'>
			<CircularProgress />

			<div className='my-4'>
				<p className='font-lato text-md'>Loading</p>
			</div>
		</div>
	);
}

export default IsLoading;
