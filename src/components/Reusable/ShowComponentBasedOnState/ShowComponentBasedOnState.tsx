import React from 'react';
import { ErrorType } from '../../../libs/types';
import Errors from '../Errors';
import IsLoading from '../IsLoading';

type showComponentBasedOnStateProps = {
	errorsData: ErrorType;
	isLoading: boolean;
	resultComponent: React.ReactElement;
};

function ShowComponentBasedOnState({
	errorsData,
	isLoading,
	resultComponent
}: showComponentBasedOnStateProps): React.ReactElement {
	console.group('Inside showComponentBasedOnState');
	console.log({ resultComponent, isLoading, errorsData });
	console.groupEnd();
	if (errorsData) {
		console.log('ERRORS CP');
		return <Errors errorsData={errorsData} />;
	} else if (isLoading) {
		console.log('IS LOADING CP');

		return <IsLoading isLoading={isLoading} />;
	} else {
		console.log('RESULT CP');
		return resultComponent;
	}
}

export default ShowComponentBasedOnState;
