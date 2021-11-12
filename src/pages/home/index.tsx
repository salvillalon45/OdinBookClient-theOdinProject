import * as React from 'react';
import Layout from '../../components/Layout';
// import Seo from '../components/Seo';
import HomePageContent from '../../components/HomePageContent';

function HomePage(): React.ReactNode {
	const id = 'homePageContainer';

	return (
		<Layout id={id}>
			<section>
				{/* <Seo title='Welcome Back' /> */}

				<HomePageContent />
			</section>
		</Layout>
	);
}

export default HomePage;
