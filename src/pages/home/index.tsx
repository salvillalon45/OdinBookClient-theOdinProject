// React
import * as React from 'react';

// Components
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import AuthErrors from '../../components/Reusable/AuthErrors';
import HomePageContent from '../../components/HomePageContent';

// Utils
import { checkUserLoggedIn } from '../../libs/authUtils';

function HomePage(): React.ReactNode {
	const [errors, setErrors] = React.useState(['']);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const id = 'homePageContainer';

	const userCheck = checkUserLoggedIn();
	console.log('What is userCheck');
	console.log({ userCheck });
	if (!userCheck && !isLoaded) {
		setErrors(['You need to log in to proceed!']);
		setIsLoaded(true);
	}
	console.log('What are errors');
	console.log(errors);
	console.log(errors[0]);
	console.log(errors[0] ? 'Auth Errors' : 'no auth errors');
	return (
		<Layout id={id}>
			<section>
				<Seo title='Home' />

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
