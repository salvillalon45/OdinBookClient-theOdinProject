import React, { ReactNode } from 'react';
// import Header from './Header';
// import Footer from './Footer';
import '../../styles/global.css';

type LayoutProps = {
	children: ReactNode;
	id: string;
};

function Layout({ children, id }: LayoutProps) {
	return (
		<>
			{/* <Header /> */}

			<main id={id}> {children} </main>

			{/* <Footer /> */}
		</>
	);
}

export default Layout;
