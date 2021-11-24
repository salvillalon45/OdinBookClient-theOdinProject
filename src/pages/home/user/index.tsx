import { PageProps } from 'gatsby';
import * as React from 'react';
import Layout from '../../../components/Layout';
import UserProfilePageContent from '../../../components/UserProfilePageContent';
import { UserType } from '../../../libs/types';

function UserProfilePage(props: PageProps): React.ReactNode {
	console.log('What are props');
	console.log({ props });
	const userData: UserType = props.pageContext.userData;
	const [errors, setErrors] = React.useState(['']);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const id = 'userProfilePageContainer';

	return (
		<Layout id={id}>
			<section>
				{/* <Seo title='Welcome Back' /> */}

				<UserProfilePageContent userData={userData} />
			</section>
		</Layout>
	);
}

export default UserProfilePage;
