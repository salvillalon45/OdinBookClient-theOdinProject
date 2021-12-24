// React & Gatsby
import React from 'react';
import { navigate } from 'gatsby-link';
import ThemeContext from '../../context/ThemeContext';

// Components
import IntroHeader from './IntroHeader';
import AuthForm from './AuthForm';
import SignUpModal from './SignUpModal';
import Errors from '../Reusable/Errors';

// Utils
import { executeRESTMethod } from '../../libs/apiUtils';
import { ErrorType } from '../../libs/types';

function IndexPageContent(): React.ReactElement {
	const contextValue = React.useContext(ThemeContext);
	const [showModal, setShowModal] = React.useState(false);
	const [finishedSignUp, setFinishedSignUp] = React.useState(false);
	const [errors, setErrors] = React.useState<ErrorType | null>(null);
	const [authData, setAuthData] = React.useState({
		first_name: '',
		last_name: '',
		username: '',
		password: ''
	});

	function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const { name, value } = event.target;

		setAuthData((prevValues) => {
			return { ...prevValues, [name]: value };
		});
	}

	function handleModal(): void {
		setShowModal(!showModal);
	}

	async function handleSubmit(authFlag: string): Promise<void> {
		let bodyData = null;
		let ready = false;

		if (authFlag === 'log-in') {
			bodyData = {
				username: authData.username,
				password: authData.password
			};
			ready = true;
		} else {
			bodyData = authData;
			handleModal();
			setFinishedSignUp(true);
		}

		const authResult = await executeRESTMethod(
			'post',
			authFlag,
			'',
			bodyData
		);

		if (!!authResult.errors) {
			const errorsData: ErrorType = { ...authResult };
			setErrors(errorsData);
			return;
		}

		if (ready) {
			const { user, token } = authResult;
			const { password, ...currentUser } = user;
			contextValue.handleSetUser(currentUser);

			localStorage.setItem('user', JSON.stringify(currentUser._id));
			localStorage.setItem('token', token);

			setAuthData({
				first_name: '',
				last_name: '',
				username: '',
				password: ''
			});

			navigate('/home');
		}
	}

	return (
		<div className='indexPageContentContainer h-screen flex justify-center items-center'>
			<div className='grid grid-cols-2 gap-5 items-center'>
				<IntroHeader />

				<div className='text-center'>
					<AuthForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						handleModal={handleModal}
					/>

					{finishedSignUp && (
						<>
							<p className='font-roboto lg:text-2xl md:text-xl sm:text-lg'>
								Successfully created acccount!
							</p>
							<p className='font-roboto lg:text-2xl md:text-xl sm:text-lg'>
								Now Log In
							</p>
						</>
					)}

					{errors && <Errors errorsData={errors} />}
				</div>
			</div>

			{showModal && (
				<SignUpModal
					showModal={showModal}
					handleChange={handleChange}
					handleModal={handleModal}
					handleSubmit={handleSubmit}
				/>
			)}
		</div>
	);
}

export default IndexPageContent;
