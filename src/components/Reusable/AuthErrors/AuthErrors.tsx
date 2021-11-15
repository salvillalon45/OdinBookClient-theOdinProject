import React from 'react';
import Errors from '../Errors';
import Button from '../Button';
import { navigate } from 'gatsby-link';

type AuthErrorsProps = {
	errors: string[];
};

function AuthErrors({ errors }: AuthErrorsProps): React.ReactElement {
	console.log({ errors });
	return (
		<div className='authCheckContainer'>
			<Errors errors={errors} />

			<div className='buttonContainer flex'>
				<Button
					buttonMessage={'Sign Up or Log In'}
					buttonAction={navigate}
					color='bg-green'
					width='w-40'
					value={'/'}
				/>
			</div>
		</div>
	);
}

export default AuthErrors;
