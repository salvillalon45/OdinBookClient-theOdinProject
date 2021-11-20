// // 'use strict';

// // /**
// //  * Source-map-support mimics node's stack trace making debugging easier
// //  * ts-node register helps importing and compiling TypeScript modules into JS
// //  */
// // // require('source-map-support').install();
// // require('ts-node').register();

// // module.exports = require('./src/gatsby/config');
// const { register } = require('esbuild-register/dist/node');

// register({
// 	target: 'node16'
// });

// module.exports = require('./src/gatsby/config');
require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
	siteMetadata: {
		siteUrl: 'https://www.yourdomain.tld',
		title: 'theOdinProject-OdinBookClient'
	},
	plugins: [
		'gatsby-plugin-image',
		'gatsby-plugin-typescript',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-postcss',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: './src/images/'
			},
			__key: 'images'
		}
	]
};
