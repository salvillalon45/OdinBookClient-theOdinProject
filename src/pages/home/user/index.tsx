import { PageProps } from 'gatsby';
import * as React from 'react';
import Layout from '../../../components/Layout';
import UserProfilePageContent from '../../../components/UserProfilePageContent';
import { UserType } from '../../../libs/types';

function UserProfilePage(props: PageProps): React.ReactNode {
	const userData: UserType = props.pageContext.userData;
	const showTabContent: number = props.location.state.showTabContent ?? 1;
	console.log({ props });
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
