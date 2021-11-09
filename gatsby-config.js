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
