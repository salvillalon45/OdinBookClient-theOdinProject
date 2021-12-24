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
import { checkUserLoggedIn, getToken } from '../../../libs/authUtils';
import { getUserId } from '../../../libs/utils';
import { useUserByID } from '../../../libs/apiUtils';
import getComponentBasedOnState from '../../../components/Reusable/getComponentBasedOnState';

// function UserProfilePage(props: PageProps): React.ReactNode {
function UserProfilePage(props: PageProps): React.ReactNode {
	const [errors, setErrors] = React.useState(['']);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [isClient, setClient] = React.useState(false);
	const showTabContent: number = props?.location?.state?.showTabContent ?? 1;
	const viewingUserId: string = props?.location?.search?.slice(1) ?? '';
	const id = 'userProfilePageContainer';
	const userCheck = checkUserLoggedIn();

	if (!userCheck && !isLoaded) {
		setErrors(['You need to log in to proceed!']);
		setIsLoaded(true);
	}

	React.useEffect(() => {
		setClient(true);
	}, []);

	function showContent() {
		if (isClient) {
			return !!errors[0] ? (
				<AuthErrors errors={errors} />
			) : (
				<UserProfilePageContent
					viewingUserId={viewingUserId}
					showTabContent={showTabContent}
				/>
			);
		} else {
			return null;
		}
	}

	return (
		<Layout id={id}>
			<section>
				<Seo title='Profile' />

				{showContent()}
			</section>
		</Layout>
	);
}

export default UserProfilePage;
