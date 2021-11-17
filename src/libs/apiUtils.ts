// const fetcher = (url: string) => {
// 	// const response = await fetch(url).then((r) => r.json());
// 	const response = await fetch(`${process.env.GATSBY_BLOG_API}/${path}`, {
// 		method,
// 		headers: {
// 			Authorization: authorization ?? '',
// 			'Content-Type': 'application/json'
// 		},
// 		body: bodyData ? JSON.stringify(bodyData) : null
// 	});
// };

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

export { executeRESTMethod };
