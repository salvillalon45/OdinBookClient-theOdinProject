import { PageProps } from 'gatsby';
import * as React from 'react';
import Layout from '../components/Layout';
// import Seo from '../components/Seo';
import IndexPageContent from '../components/IndexPageContent';

function IndexPage(): React.ReactNode {
	// const IndexPage: React.FC<PageProps> = () => {
	const id = 'indexPageContainer';

	return (
		<Layout id={id}>
			<section>
				{/* <Seo title='Welcome Back' /> */}

				<IndexPageContent />
			</section>
		</Layout>
	);
}

export default IndexPage;
