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
	const [isClient, setClient] = React.useState(false);
	const id = 'homePageContainer';

	React.useEffect(() => {
		setClient(true);
	}, []);

	const userCheck = checkUserLoggedIn();
	if (!userCheck && !isLoaded) {
		setErrors(['You need to log in to proceed!']);
		setIsLoaded(true);
	}

	function showContent() {
		if (isClient) {
			if (!!errors[0]) {
				return <AuthErrors errors={errors} />;
			}

			return <HomePageContent />;
		} else {
			return null;
		}
	}

	return (
		<Layout id={id}>
			<section>
				<Seo title='Home' />

				{showContent()}
			</section>
		</Layout>
	);
}

export default HomePage;
