require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
	siteMetadata: {
		title: 'OdinBook',
		description: 'OdinBook made by Salvador Villalon',
		titleTemplate: '%s · OdinBook',
		url: 'https://blog-sal-admin.netlify.app/', // No trailing slash allowed!
		image: '/images/logo.png', // Path to your image you placed in the 'static' folder
		twitterUsername: '@salvillalon45'
	},
	plugins: [
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `odin-book`,
				short_name: `odin-book`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/icon.png` // This path is relative to the root of the site.
			}
		},
		'gatsby-plugin-image',
		'gatsby-plugin-typescript',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-postcss',
		'gatsby-transformer-sharp'
		// {
		// 	resolve: `gatsby-source-filesystem`,
		// 	options: {
		// 		name: `images`,
		// 		path: `${__dirname}/src/images`
		// 	}
		// },
	]
};
