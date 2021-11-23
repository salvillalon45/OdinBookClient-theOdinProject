import * as React from 'react';
import Layout from '../../../components/Layout';
// import Seo from '../components/Seo';
// import AuthErrors from '../../components/Reusable/AuthErrors';
import UserProfilePageContent from '../../../components/UserProfilePageContent';
// import { checkUserLoggedIn } from '../../libs/authUtils';

function UserProfilePage(): React.ReactNode {
	const [errors, setErrors] = React.useState(['']);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const id = 'userProfilePageContainer';

	return (
		<Layout id={id}>
			<section>
				{/* <Seo title='Welcome Back' /> */}

				<UserProfilePageContent />
			</section>
		</Layout>
	);
}

export default UserProfilePage;
