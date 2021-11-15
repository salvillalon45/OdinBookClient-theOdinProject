import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../../styles/global.css';

type LayoutProps = {
	children: ReactNode;
	id: string;
};

function Layout({ children, id }: LayoutProps): React.ReactElement {
	function showHeader(): React.ReactNode {
		if (id === 'indexPageContainer') {
			return null;
		}

		return <Header />;
	}

	function showFooter(): React.ReactNode {
		if (id === 'indexPageContainer') {
			return <Footer />;
		}

		return null;
	}

	return (
		<>
			{showHeader()}

			<main id={id}> {children} </main>

			{showFooter()}
		</>
	);
}

export default Layout;
