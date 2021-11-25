import useSWR from 'swr';
import { PostType, UsePostHookReturnType } from './types';

const fetcher = (url: string, authorization: string) =>
	fetch(url, {
		headers: { Authorization: authorization }
	}).then((res) => res.json());

function usePosts(
	userid: string,
	authorization: string
): UsePostHookReturnType {
	const { data, error: errors } = useSWR(
		[`${process.env.GATSBY_ODIN_BOOK}/posts/${userid}`, authorization],
		fetcher
	);

	console.log('What is data');
	console.log({ data });

	return {
		allPosts: data,
		isLoading: !errors && !data,
		isError: errors
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
