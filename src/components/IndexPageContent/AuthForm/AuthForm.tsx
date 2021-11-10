import React from 'react';
import Button from '../../Reusable/Button';

type AuthFormProps = {
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
	handleModal: () => void;
};

function AuthForm(props: AuthFormProps): React.ReactElement {
	return (
		<div className='authFormWrapperContainer m-auto w-full max-w-xs my-9'>
			<form className='authFormContainer bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4'>
				<div className='formInputsContainer -mb-6'>
					<div className='mb-4'>
						<input
							className='shadow appearance-none border font-roboto rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='username'
							name='username'
							type='text'
							placeholder='Username'
							onChange={(event) => props.handleChange(event)}
						/>
					</div>

					<div className='mb-6'>
						<input
							className='shadow appearance-none border font-roboto rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
							id='password'
							name='password'
							type='password'
							placeholder='******************'
							onChange={(event) => props.handleChange(event)}
						/>
					</div>
				</div>

				<div className='buttonContainer mb-6'>
					<Button
						color='bg-blue'
						buttonMessage='Log In'
						width='w-full'
						value='log-in'
						buttonAction={props.handleSubmit}
					/>
				</div>

				<hr className='h-0.5 bg-grey border-none' />

				<div className='buttonContainer flex'>
					<Button
						color='bg-green'
						buttonMessage='Create New Account'
						buttonAction={props.handleModal}
					/>
				</div>
			</form>
		</div>
	);
}

export default AuthForm;
