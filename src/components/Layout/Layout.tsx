// React
import React, { ReactNode } from 'react';

// Components
import Header from './Header';
import Footer from './Footer';

// Styling
import '../../styles/global.css';

type LayoutProps = {
	children: ReactNode;
	id: string;
};

function Layout({ children, id }: LayoutProps): React.ReactElement {
	function showHeader(): React.ReactNode {
		return id === 'indexPageContainer' ? null : <Header />;
	}

	function showFooter(): React.ReactNode {
		return id === 'indexPageContainer' ? <Footer /> : null;
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
