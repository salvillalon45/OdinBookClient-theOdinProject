import React from 'react';
import { navigate } from 'gatsby-link';
import IntroHeader from './IntroHeader';
import AuthForm from './AuthForm';
import SignUpModal from './SignUpModal';

// import Errors from '../Reusable/Errors';
// import {
// 	executeRESTMethod,
// 	checkUserLoggedIn,
// 	checkForErrors
// } from '../../lib/utils';

function IndexPageContent(): React.ReactElement {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [showModal, setShowModal] = React.useState(false);
	// const [errors, setErrors] = React.useState(null);
	const [authData, setAuthData] = React.useState({
		first_name: '',
		last_name: '',
		username: '',
		password: ''
	});

	// React.useEffect(() => {
	// 	if (checkUserLoggedIn()) {
	// 		navigate('/dashboard');
	// 	}
	// });

	function handleModal(): void {
		setShowModal(!showModal);
	}

	async function handleSubmit(authFlag: string): Promise<void> {
		console.log({ authFlag });
		console.log({ authData });
		// if (
		// 	process.env.GATSBY_USER === usernameTest &&
		// 	process.env.GATSBY_PASSWORD === password
		// ) {
		// 	const loginData = await executeRESTMethod(
		// 		'post',
		// 		authData,
		// 		'log-in'
		// 	);
		// 	checkForErrors(loginData, setErrors);
		// 	const { user, token } = loginData;
		// 	const { username, _id: user_ref } = user;
		// 	localStorage.setItem(
		// 		'user',
		// 		JSON.stringify({ username, user_ref })
		// 	);
		// 	localStorage.setItem('token', token);
		// 	setUsername('');
		// 	setPassword('');
		// 	navigate('/dashboard');
		// } else {
		// 	checkForErrors(
		// 		{ errors: ['Incorrect Username and Password'] },
		// 		setErrors
		// 	);
		// }
	}

	// const changeHandler = (e) => {
	// 	setAllValues({ ...allValues, [e.target.name]: e.target.value });
	// };
	function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const { name, value } = event.target;
		console.log({ name });
		console.log({ value });
		setAuthData((prevValues) => {
			return { ...prevValues, [name]: value };
		});
		// setAuthData({
		// 	...authData,
		// 	[name]: value
		// });
		// if (name === 'username') {
		// 	setUsername(value);
		// } else {
		// 	setPassword(value);
		// }
	}

	return (
		<div className='indexPageContentContainer h-screen flex justify-center items-center'>
			<div className='grid grid-cols-2 gap-5 items-center'>
				<IntroHeader />

				<AuthForm
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					handleModal={handleModal}
				/>
			</div>

			{showModal && (
				<SignUpModal
					showModal={showModal}
					handleChange={handleChange}
					handleModal={handleModal}
					handleSubmit={handleSubmit}
				/>
			)}

			{/* {errors && <Errors errors={errors} />} */}
		</div>
	);
}

export default IndexPageContent;
