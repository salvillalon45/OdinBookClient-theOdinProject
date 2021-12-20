const fetch = require(`node-fetch`);
const path = require(`path`);
require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}` // this dotenv config gives access to process.env object
});

// Creating Pages from Data Programmatically
// More here: https://www.gatsbyjs.com/docs/programmatically-create-pages-from-data/
exports.createPages = async ({ actions }) => {
	const response = await fetch(`${process.env.GATSBY_ODIN_BOOK}/users`);
	const usersData = await response.json();

	usersData.users.forEach((user) => {
		actions.createPage({
			path: `/home/user/${user._id}`,
			component: path.resolve('src/pages/home/user/index.tsx'),
			context: { slug: user._id, userData: user }
		});
	});
};
