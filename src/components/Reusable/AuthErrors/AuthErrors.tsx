// React & Gatsby
import React from 'react';
import { navigate } from 'gatsby-link';

// Components
import Errors from '../Errors';
import Button from '../Button';

type AuthErrorsProps = {
	errors: string[];
};

function AuthErrors({ errors }: AuthErrorsProps): React.ReactElement {
	console.log({ errors });
	return (
		<div className='authCheckContainer'>
			<Errors
				errorsData={{
					context: 'AUTH ERRORS',
					message: 'Auth Errors',
					errors: errors
				}}
			/>

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
