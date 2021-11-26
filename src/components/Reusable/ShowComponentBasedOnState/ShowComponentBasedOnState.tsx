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
	if (errorsData) {
		console.log('Going to show ERRRORS CP');
		return <Errors errorsData={errorsData} />;
	} else if (isLoading) {
		console.log('Going to show isLoading CP');
		return <IsLoading isLoading={isLoading} />;
	} else {
		console.log('Going to show RESULT CP');
		return resultComponent;
	}
}

export default ShowComponentBasedOnState;
