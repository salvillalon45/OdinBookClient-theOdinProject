import useSWR from 'swr';
import { ErrorType, PostType, UsePostHookReturnType } from './types';

async function fetcher(url: string, authorization: string) {
	const response = await fetch(url, {
		headers: { Authorization: authorization }
	});

	// If the status code is not in the range 200-299,
	// we still try to parse and throw it.
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

function usePosts(
	userid: string,
	authorization: string
): UsePostHookReturnType {
	const { data, error: errorsData } = useSWR(
		[
			`${process.env.GATSBY_ODIN_BOOK}/posts/${userid}`,
			authorization + 's'
		],
		fetcher
	);

	console.log('What is data');
	console.log({ data });
	console.log('What is errorsData');
	console.log({ errorsData });

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

export { executeRESTMethod, usePosts };
