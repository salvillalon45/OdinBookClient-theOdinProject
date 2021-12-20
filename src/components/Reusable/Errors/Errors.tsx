// React
import React from 'react';

// Utils
import { ErrorType } from '../../../libs/types';

type ErrorsProps = {
	errorsData: ErrorType;
};

function Errors(props: ErrorsProps) {
	console.log({ props });
	const { errorsData } = props;

	return (
		<div className='errorContainer text-center my-9'>
			<h3 className='font-heebo font-bold text-2xl underline'>Oops</h3>

			<div className='my-4'>
				{errorsData.errors.map((error, index) => {
					return (
						<p key={index} className='font-roboto text-md'>
							{error}
						</p>
					);
				})}
			</div>
		</div>
	);
}

export default Errors;
