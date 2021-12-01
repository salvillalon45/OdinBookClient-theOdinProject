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
		return <Errors errorsData={errorsData} />;
	} else if (isLoading) {
		return <IsLoading isLoading={isLoading} />;
	} else {
		return resultComponent;
	}
}

export default ShowComponentBasedOnState;
