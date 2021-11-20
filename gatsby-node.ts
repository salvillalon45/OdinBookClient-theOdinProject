// export * from './src/gatsby/node';
// console.log('Inside gatsby-node.ts file');
// // export { createPages } from './src/gatsby/node';
// // console.log(createPages);
// const test = require('./src/gatsby/node');
// console.log('What is test');
// console.log(test);
// module.exports = test;
import { GatsbyNode } from 'gatsby';
import { UserType } from './src/libs/types';

const fetch = require(`node-fetch`);
const path = require(`path`);
require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}` // this dotenv config gives access to process.env object
});

console.log('Inside node.ts file');

type UsersDataType = {
	message: string;
	users: UserType[];
	context?: string;
	errors?: string[];
};

// Creating Pages from Data Programmatically
// More here: https://www.gatsbyjs.com/docs/programmatically-create-pages-from-data/
export const createPages: GatsbyNode['createPages'] = async ({ actions }) => {
	const response = await fetch(`${process.env.GATSBY_ODIN_BOOK}/users`);
	const usersData: UsersDataType = await response.json();
	console.log('What is usersData');
	console.log(usersData);
	usersData.users.forEach((user) => {
		console.log('What is user');
		console.log(user);
		actions.createPage({
			path: `/home/user/${user._id}`,
			component: path.resolve('src/pages/home/user/index.tsx'),
			context: { slug: user._id }
		});
	});

	// Here we are giving pages data at build time
	// postsData.posts.forEach((item) => {
	// 	actions.createPage({
	// 		path: `/dashboard/blog/${item._id}/action`,
	// 		component: path.resolve('src/templates/action_post.js'),
	// 		context: { slug: item._id, postData: item, actionToTake: 'update' }
	// 	});
	// });

	// postsData.posts.forEach((item) => {
	// 	actions.createPage({
	// 		path: `/dashboard/action`,
	// 		component: path.resolve('src/templates/action_post.js'),
	// 		context: { slug: item._id, postData: item, actionToTake: 'create' }
	// 	});
	// });
};
