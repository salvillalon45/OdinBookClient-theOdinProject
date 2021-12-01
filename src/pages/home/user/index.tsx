import { PageProps } from 'gatsby';
import * as React from 'react';
import Layout from '../../../components/Layout';
import UserProfilePageContent from '../../../components/UserProfilePageContent';
import { UserType } from '../../../libs/types';

function UserProfilePage(props: PageProps): React.ReactNode {
	const userData: UserType = props.pageContext.userData;
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
