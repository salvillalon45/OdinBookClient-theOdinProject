import React from 'react';

function ShowComponentBasedOnState(
	resultComponent,
	isLoading,
	errorsData
): React.ReactNode {
	if (errorsData) {
		console.log('ERRORS CP');

		return (
			<>
				<Error errorsData={errorsData} />
			</>
		);
	} else if (isLoading) {
		console.log('IS LOADING CP');

		return <IsLoading isLoading={isLoading} />;
	} else {
		console.log('RESULT CP');
		return resultComponent;
	}
}
