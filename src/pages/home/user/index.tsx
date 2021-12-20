// React & Gatsby
import { PageProps } from 'gatsby';
import * as React from 'react';

// Components
import Layout from '../../../components/Layout';
import UserProfilePageContent from '../../../components/UserProfilePageContent';

// Utils
import { UserType } from '../../../libs/types';

function UserProfilePage(props: PageProps): React.ReactNode {
	console.log(props);
	const userData: UserType = props.pageContext.userData;
	const showTabContent: number = props.location.state.showTabContent ?? 1;
	const id = 'userProfilePageContainer';

	return (
		<Layout id={id}>
			<section>
				{/* <Seo title='Welcome Back' /> */}

				<UserProfilePageContent
					userData={userData}
					showTabContent={showTabContent}
				/>
			</section>
		</Layout>
	);
}

export default UserProfilePage;
