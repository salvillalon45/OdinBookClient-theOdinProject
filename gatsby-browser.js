import './src/styles/global.css';
import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';

// highlight-start
export function wrapRootElement({ element }) {
	return <ThemeProvider>{element}</ThemeProvider>;
}
// highlight-end
