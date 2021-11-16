import React from 'react';
import LeftContent from './Left';
import MiddleContent from './Middle';
import RightContent from './Right';
// import Errors from '../Reusable/Errors';
// import {
// 	executeRESTMethod,
// 	checkUserLoggedIn,
// 	checkForErrors
// } from '../../lib/utils';

function HomePageContent(): React.ReactElement {
	return (
		<div className='homePageContentContainer'>
			<div className='grid md:grid-cols-4 grid-cols-2 gap-x-4 gap-y-10 mt-8'>
				<LeftContent />

				<MiddleContent />

				<RightContent />
			</div>
		</div>
	);
}

export default HomePageContent;
