import './src/styles/global.css';
// import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';

// export function wrapRootElement({ element }) {
// 	return <ThemeProvider>{element}</ThemeProvider>;
// }

import React from 'react';
import type { GatsbyBrowser } from 'gatsby';

const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
	return <ThemeProvider>{element}</ThemeProvider>;
};

export { wrapPageElement };
