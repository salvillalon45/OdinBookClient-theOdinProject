// React
import React from 'react';

// Components
import Errors from '../Errors';
import IsLoading from '../IsLoading';

// Utils
import { ErrorType } from '../../../libs/types';

function getComponentBasedOnState(
	errorsData: ErrorType,
	isLoading: boolean
): React.ReactNode {
	if (!!errorsData) {
		return <Errors errorsData={errorsData} />;
	} else if (isLoading) {
		return <IsLoading />;
	} else {
		return null;
	}
}

export default getComponentBasedOnState;
