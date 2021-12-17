import React from 'react';
import { ErrorType } from '../../../libs/types';
import Errors from '../Errors';
import IsLoading from '../IsLoading';

function getComponentBasedOnState(
	errorsData: ErrorType,
	isLoading: boolean
): React.ReactNode {
	if (!!errorsData) {
		return <Errors errorsData={errorsData} />;
	} else if (isLoading) {
		return <IsLoading isLoading={isLoading} />;
	} else {
		return null;
	}
}

export default getComponentBasedOnState;
