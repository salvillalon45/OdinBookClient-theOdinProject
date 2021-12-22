import React from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

type SeoProps = {
	title: string;
};

function Seo({ title: subTitle }: SeoProps) {
	const { pathname } = useLocation();
	const siteMetadata = {
		title: 'OdinBook',
		description: 'OdinBook made by Salvador Villalon',
		titleTemplate: '%s · OdinBook',
		url: 'https://blog-sal-admin.netlify.app/', // No trailing slash allowed!
		image: 'src/images/logo.png',
		twitterUsername: '@salvillalon45'
	};

	const { title, titleTemplate, description, url, image, twitterUsername } =
		siteMetadata;

	const seo = {
		title: title,
		description: description,
		image: `${url}${image}`,
		url: `${url}${pathname}`
	};

	return (
		<Helmet title={subTitle} titleTemplate={titleTemplate}>
			<meta name='description' content={seo.description} />
			<meta name='image' content={seo.image} />
			{seo.url && <meta property='og:url' content={seo.url} />}
			{seo.title && <meta property='og:title' content={seo.title} />}
			{seo.description && (
				<meta property='og:description' content={seo.description} />
			)}
			{seo.image && <meta property='og:image' content={seo.image} />}
			<meta name='twitter:card' content='summary_large_image' />
			{twitterUsername && (
				<meta name='twitter:creator' content={twitterUsername} />
			)}
			{seo.title && <meta name='twitter:title' content={seo.title} />}
			{seo.description && (
				<meta name='twitter:description' content={seo.description} />
			)}
			{seo.image && <meta name='twitter:image' content={seo.image} />}
		</Helmet>
	);
}

export default Seo;

const query = graphql`
	query SEO {
		site {
			siteMetadata {
				defaultTitle: title
				titleTemplate
				defaultDescription: description
				siteUrl: url
				defaultImage: image
				twitterUsername
			}
		}
	}
`;
