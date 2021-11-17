import * as React from 'react';
import Layout from '../../components/Layout';
// import Seo from '../components/Seo';
import AuthErrors from '../../components/Reusable/AuthErrors';
import HomePageContent from '../../components/HomePageContent';
import { checkUserLoggedIn } from '../../libs/authUtils';

function HomePage(): React.ReactNode {
	const [errors, setErrors] = React.useState(['']);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const id = 'homePageContainer';

	const userCheck = checkUserLoggedIn();
	// console.log('WHAT IS USER ');
	// console.log(userCheck);
	if (!userCheck && !isLoaded) {
		console.log('No signed in index home page');
		setErrors(['You need to log in to proceed!']);
		setIsLoaded(true);
	}

	console.log('What are errors in index home page');
	console.log(errors);

	return (
		<Layout id={id}>
			<section>
				{/* <Seo title='Welcome Back' /> */}

				{errors[0] ? (
					<AuthErrors errors={errors} />
				) : (
					<HomePageContent />
				)}
			</section>
		</Layout>
	);
}

export default HomePage;
