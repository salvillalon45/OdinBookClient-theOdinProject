import React from 'react';
import { ErrorType } from '../../../libs/types';

type ErrorsProps = {
	errorsData: ErrorType;
};

function Errors(props: ErrorsProps) {
	const { errorsData } = props;
	console.log('What are errors in Errors CP');
	console.log({ errorsData });

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
