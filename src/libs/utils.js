import React from 'react';
import jwt_decode from 'jwt-decode';
import Errors from '../components/Reusable/Errors';
import IsLoaded from '../components/Reusable/IsLoaded';
import NoContentAvailable from '../components/Reusable/NoContentAvailable';

function capitalize(s) {
	if (typeof s !== 'string') {
		return '';
	}

	return s.charAt(0).toUpperCase() + s.slice(1);
}

function checkForAuthError(isLoaded, setErrors, setIsLoaded) {
	const userCheck = checkUserLoggedIn();

	if (!userCheck && !isLoaded) {
		setErrors(['You need to log in to proceed!']);
		setIsLoaded(true);
	}
}

function checkForErrors(data, setErrors) {
	const errors = data.errors ?? '';

	if (errors) {
		setErrors(errors);
		return;
	}
}

function showContent(errors, isLoaded, message, dataToShow) {
	if (errors) {
		return <Errors errors={errors} />;
	} else if (!isLoaded) {
		return <IsLoaded message={message} action={'Loading'} />;
	} else if (dataToShow && dataToShow.length === 0) {
		return <NoContentAvailable message={message} />;
	} else {
		return null;
	}
}

async function executeRESTMethod(
	method,
	bodyData,
	path,
	authorization,
	errorMessage
) {
	const response = await fetch(`${process.env.GATSBY_BLOG_API}/${path}`, {
		method,
		headers: {
			Authorization: authorization ?? '',
			'Content-Type': 'application/json'
		},
		body: bodyData ? JSON.stringify(bodyData) : null
	});

	let jsonData = {};

	const { status, statusText } = response;
	if (status === 401 && statusText === 'Unauthorized') {
		jsonData.errors = [errorMessage];
		return jsonData;
	}

	jsonData = await response.json();

	return jsonData;
}

function checkUserLoggedIn() {
	try {
		const token = localStorage.getItem('token') ?? '';
		const user = localStorage.getItem('user') ?? '';
		const decoded = jwt_decode(token);

		if (user === '') {
			return false;
		}

		if (token && decoded) {
			const expiry = decoded.exp;
			const now = new Date();

			if (now.getTime() > expiry * 1000) {
				// Token expired
				return false;
			} else {
				// Valid token
				return true;
			}
		}

		return true;
	} catch (error) {
		return false;
	}
}

function getPostId(props) {
	return props?.pageContext?.slug ?? '';
}

function checkActionPage(props) {
	return props.pageContext.actionToTake ?? '';
}

function formatDate(timestamp) {
	const options = { year: 'numeric', month: 'short', day: 'numeric' };
	const messageDate = timestamp.toLocaleDateString([], options);
	return messageDate;
}

export {
	checkUserLoggedIn,
	formatDate,
	getPostId,
	checkActionPage,
	executeRESTMethod,
	showContent,
	capitalize,
	checkForErrors,
	checkForAuthError
};
