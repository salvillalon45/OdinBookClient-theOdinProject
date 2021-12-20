// React
import React from 'react';

// Components
import NoContentAvailable from '../NoContentAvailable';

function ShowComponentBasedOnData(
	message: string,
	cp2: React.ReactNode,
	data: any
): React.ReactNode {
	return data.length === 0 ? <NoContentAvailable message={message} /> : cp2;
}

export default ShowComponentBasedOnData;
