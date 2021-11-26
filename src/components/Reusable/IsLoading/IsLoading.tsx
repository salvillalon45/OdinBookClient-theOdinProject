import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

type IsLoadingProps = {
	isLoading: boolean;
};

function IsLoading({ isLoading }: IsLoadingProps): React.ReactElement {
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
