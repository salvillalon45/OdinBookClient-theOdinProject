import React from 'react';

type ErrorsProps = {
	errors: string[];
};

function Errors(props: ErrorsProps) {
	const { errors } = props;

	return (
		<div className='errorContainer text-center my-9'>
			<h3 className='font-heebo font-bold text-2xl underline'>Oops</h3>

			<div className='my-4'>
				{errors.map((error, index) => {
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
