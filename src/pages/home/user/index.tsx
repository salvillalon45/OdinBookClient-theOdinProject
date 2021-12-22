// React & Gatsby
import { PageProps } from 'gatsby';
import * as React from 'react';

// Components
import Layout from '../../../components/Layout';
import UserProfilePageContent from '../../../components/UserProfilePageContent';
import Seo from '../../../components/Seo';
import AuthErrors from '../../../components/Reusable/AuthErrors';

// Utils
import { UserType } from '../../../libs/types';
import { checkUserLoggedIn } from '../../../libs/authUtils';

function UserProfilePage(props: PageProps): React.ReactNode {
	const [errors, setErrors] = React.useState(['']);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const userData: UserType = props?.pageContext?.userData;
	const showTabContent: number = props?.location?.state?.showTabContent ?? 1;
	const id = 'userProfilePageContainer';

	const userCheck = checkUserLoggedIn();
	console.log('What is userCheck');
	console.log({ userCheck });
	if (!userCheck && !isLoaded) {
		setErrors(['You need to log in to proceed!']);
		setIsLoaded(true);
	}

	return (
		<Layout id={id}>
			<section>
				<Seo title='Profile' />

				{errors[0] ? (
					<AuthErrors errors={errors} />
				) : (
					<UserProfilePageContent
						userData={userData}
						showTabContent={showTabContent}
					/>
				)}
			</section>
		</Layout>
	);
}

export default UserProfilePage;
