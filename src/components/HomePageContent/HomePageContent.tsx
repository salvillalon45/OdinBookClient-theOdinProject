// React
import React from 'react';

// Components
import LeftContent from './Left';
import MiddleContent from './Middle';
import RightContent from './Right';

function HomePageContent(): React.ReactElement {
	return (
		<div className='homePageContentContainer'>
			<div className='grid grid-cols-4 gap-x-4 gap-y-10 mt-8'>
				<LeftContent />

				<MiddleContent />

				<RightContent />
			</div>
		</div>
	);
}

export default HomePageContent;
