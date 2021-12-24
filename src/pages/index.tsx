// React
import * as React from 'react';

// Components
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import IndexPageContent from '../components/IndexPageContent';

function IndexPage(): React.ReactNode {
	const id = 'indexPageContainer';
	const [isClient, setClient] = React.useState(false);

	React.useEffect(() => {
		setClient(true);
	}, []);

	function showContent() {
		if (isClient) {
			return <IndexPageContent />;
		} else {
			return null;
		}
	}

	return (
		<Layout id={id}>
			<section>
				<Seo title='Welcome' />

				{showContent()}
			</section>
		</Layout>
	);
}

export default IndexPage;
