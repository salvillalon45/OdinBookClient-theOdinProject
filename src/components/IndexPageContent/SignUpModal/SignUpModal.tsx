import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '../../Reusable/Button';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};

type SignUpModalProps = {
	showModal: boolean;
	handleModal: () => void;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (authFlag: string) => void;
};

function SignUpModal(props: SignUpModalProps): React.ReactElement {
	const { showModal, handleModal, handleChange, handleSubmit } = props;

	return (
		<Modal
			open={showModal}
			onClose={handleModal}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={style}>
				<form className='w-full max-w-lg'>
					<div className='flex flex-wrap -mx-3 mb-0'>
						<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
							<input
								className='font-roboto appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
								name='first_name'
								id='grid-first-name'
								type='text'
								placeholder='First Name'
								onChange={(event) => handleChange(event)}
							/>
						</div>

						<div className='w-full md:w-1/2 px-3'>
							<input
								className='font-roboto appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='grid-last-name'
								name='last_name'
								type='text'
								placeholder='Last Name'
								onChange={(event) => handleChange(event)}
							/>
						</div>
					</div>

					<div className='flex flex-wrap -mx-3 mb-4'>
						<div className='w-full px-3'>
							<input
								className='font-roboto appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='grid-username'
								name='username'
								type='text'
								placeholder='Your Username'
								onChange={(event) => handleChange(event)}
							/>
						</div>
					</div>

					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full px-3'>
							<input
								className='font-roboto appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='grid-password'
								name='password'
								type='password'
								placeholder='******************'
								onChange={(event) => handleChange(event)}
							/>
							<p className='text-gray-600 text-xs italic'>
								Make it as long and as crazy as you'd like
							</p>
						</div>
					</div>

					<div className='flex flex-wrap -mx-3 mb-2'>
						<p className='font-roboto text-gray-600 text-xs italic'>
							By clicking Sign Up, you agree to our Terms, Data
							Policy and Cookies Policy. You may receive SMS
							Notifications from us and can opt out any time.
						</p>
					</div>

					<div className='buttonContainer flex'>
						<Button
							color='bg-green'
							buttonMessage='Sign Up'
							width='w-40'
							value='sign-up'
							buttonAction={handleSubmit}
						/>
					</div>
				</form>
			</Box>
		</Modal>
	);
}

export default SignUpModal;
