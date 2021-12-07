import React from 'react';

export default function Test(
	cp1: React.ReactNode,
	cp2: React.ReactNode,
	data: any
): React.ReactNode {
	let result: React.ReactNode = null;

	if (data.length === 0) {
		result = cp1;
	} else {
		result = cp2;
	}

	return result;
}
