import useSWR from 'swr';
// import { useSWRInfinite } from 'swr';
import useSWRInfinite from 'swr/infinite';
import {
	UseUserByIDHookReturnType,
	ErrorType,
	PostType,
	UsePostsHookReturnType,
	UseUsersHookReturnType
} from './types';
// Number of posts to fetch per request
const PAGE_LIMIT = 3;

async function fetcher(url: string, authorization: string) {
	const response = await fetch(url, {
		headers: { Authorization: authorization }
	});

	const { status, statusText } = response;
	if (status === 401 && statusText === 'Unauthorized') {
		const error: ErrorType = {
			context: 'NOT AUTHORIZED',
			message: 'You need to log in to proceed!',
			errors: ['You need to log in to proceed!']
		};

		throw error;
	}

	return await response.json();
}

function usePostInfinite(userid: string, authorization: string) {
	const {
		data: postData,
		error,
		size,
		setSize
	} = useSWRInfinite((index: number) => {
		return [
			`${process.env.GATSBY_ODIN_BOOK}/posts/${userid}?skip=${
				index + 1
			}&limit=${PAGE_LIMIT}`,
			authorization
		];
	}, fetcher);

	console.group('Data in useSWRInfinite');
	const allPosts = postData ? [].concat(...postData) : null;
	console.log({ allPosts });
	const isLoadingInitialData = !postData && !error;
	const isLoadingMore =
		isLoadingInitialData ||
		(size > 0 && postData && typeof postData[size - 1] === 'undefined');
	const isEmpty = postData?.[0]?.length === 0;
	const isReachingEndCheck = postData
		? postData[postData.length - 1]?.posts.length < PAGE_LIMIT &&
		  postData[postData.length - 1]?.userPosts.length < PAGE_LIMIT
		: null;
	const isReachingEnd = isEmpty || isReachingEndCheck;

	console.groupEnd();

	console.log({
		allPosts,
		error,
		isLoadingMore,
		size,
		setSize,
		isReachingEnd
	});
	return { allPosts, error, isLoadingMore, size, setSize, isReachingEnd };
}

function useUserByID(
	userid: string,
	authorization: string
): UseUserByIDHookReturnType {
	const { data, error: errorsData } = useSWR(
		[`${process.env.GATSBY_ODIN_BOOK}/users/${userid}`, authorization],
		fetcher
	);
	// console.group('Inside useUserByID()');
	// console.log({ data });
	// console.log('What is errorsData in USE USER');
	// console.log({ errorsData });
	// console.log(!errorsData && !data);
	// console.groupEnd();
	return {
		userData: data,
		isLoading: !errorsData && !data,
		errorsData
	};
}

function useUsers(authorization: string): UseUsersHookReturnType {
	const { data, error: errorsData } = useSWR(
		[`${process.env.GATSBY_ODIN_BOOK}/users`, authorization],
		fetcher
	);

	// console.group('Inside useUsers()');
	// console.log('What is data in useUsers');
	// console.log({ data });
	// console.log('What is errorsData in USE USER');
	// console.log({ errorsData });
	// console.log(!errorsData && !data);
	// console.groupEnd();
	return {
		usersData: data,
		isLoading: !errorsData && !data,
		errorsData
	};
}

function usePosts(
	userid: string,
	authorization: string
): UsePostsHookReturnType {
	const { data, error: errorsData } = useSWR(
		[`${process.env.GATSBY_ODIN_BOOK}/posts/${userid}`, authorization],
		fetcher
	);

	return {
		allPosts: data,
		isLoading: !errorsData && !data,
		errorsData
	};
}

async function executeRESTMethod(
	method: string,
	path: string,
	authorization?: string,
	bodyData?: Object
) {
	const response = await fetch(`${process.env.GATSBY_ODIN_BOOK}/${path}`, {
		method,
		headers: {
			Authorization: authorization ?? '',
			'Content-Type': 'application/json'
		},
		body: bodyData ? JSON.stringify(bodyData) : null
	});

	const { status, statusText } = response;
	if (status === 401 && statusText === 'Unauthorized') {
		return { errors: ['Log in to access OdinBook'] };
	}

	const jsonData = await response.json();
	return jsonData;
}

export { executeRESTMethod, usePosts, useUserByID, useUsers, usePostInfinite };
