import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import {
	UseUserByIDHookReturnType,
	ErrorType,
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
		error: errorsData,
		mutate: infiniteMutate,
		size,
		setSize,
		isValidating
	} = useSWRInfinite((index: number) => {
		return [
			`${process.env.GATSBY_ODIN_BOOK}/posts/${userid}?skip=${
				index + 1
			}&limit=${PAGE_LIMIT}`,
			authorization
		];
	}, fetcher);

	const allPosts = postData ? [].concat(...postData) : [];
	const isLoadingInitialData = !postData && !errorsData;
	const isLoadingMore =
		isLoadingInitialData ||
		(size > 0 && postData && typeof postData[size - 1] === 'undefined');
	const isEmpty = postData?.[0]?.length === 0;
	const isReachingEndCheck = postData
		? postData[postData.length - 1]?.posts.length < PAGE_LIMIT &&
		  postData[postData.length - 1]?.userPosts.length < PAGE_LIMIT
		: null;
	const isReachingEnd = isEmpty || isReachingEndCheck;

	return {
		allPosts,
		errorsData,
		isLoadingMore: !!isLoadingMore,
		infiniteMutate,
		size,
		setSize,
		isReachingEnd: !!isReachingEnd,
		isValidating
	};
}

function useUserByID(
	userid: string,
	authorization: string
): UseUserByIDHookReturnType {
	const { data, error: errorsData } = useSWR(
		[`${process.env.GATSBY_ODIN_BOOK}/users/${userid}`, authorization],
		fetcher
	);

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

function checkDataForRequest(bodyData: any, withFilesFlag?: string): any {
	if (!!withFilesFlag) {
		return bodyData.image_obj;
	}

	return JSON.stringify(bodyData);
}

function createHeadersForRequest(
	authorization?: string,
	withFilesFlag?: string
): Headers {
	const headers = new Headers();

	if (!!withFilesFlag) {
		headers.append('Authorization', authorization ?? '');
		return headers;
	}

	headers.append('Authorization', authorization ?? '');
	headers.append('Content-Type', 'application/json');

	return headers;
}

async function executeRESTMethod(
	method: string,
	path: string,
	authorization?: string,
	bodyData?: Object,
	withFilesFlag?: string
) {
	const headersObj: Headers = createHeadersForRequest(
		authorization,
		withFilesFlag
	);
	const response = await fetch(`${process.env.GATSBY_ODIN_BOOK}/${path}`, {
		method,
		headers: headersObj,
		body: bodyData ? checkDataForRequest(bodyData, withFilesFlag) : null
	});

	const { status, statusText } = response;
	if (status === 401 && statusText === 'Unauthorized') {
		return { errors: ['Log in to access OdinBook'] };
	}

	const jsonData = await response.json();
	return jsonData;
}

export { executeRESTMethod, usePosts, useUserByID, useUsers, usePostInfinite };
