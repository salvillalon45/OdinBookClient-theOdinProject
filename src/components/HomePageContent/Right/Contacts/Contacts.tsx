import React from 'react';
import ThemeContext from '../../../../context/ThemeContext';
import { useUser } from '../../../../libs/apiUtils';
import { getToken } from '../../../../libs/authUtils';
import Errors from '../../../Reusable/Errors';
import IsLoading from '../../../Reusable/IsLoading';
import ShowComponentBasedOnState from '../../../Reusable/ShowComponentBasedOnState';
import ContactItem from './ContactItem';

function Contacts(): React.ReactElement {
	const contextValue = React.useContext(ThemeContext);
	const { userData, isLoading, errorsData } = useUser(
		contextValue.user._id,
		getToken()
	);

	function createContactItems(): React.ReactNode {
		console.group('createContactItems');
		console.log({ userData, isLoading, errorsData });
		console.log('Friends check');
		console.log(userData.user.friends);
		console.groupEnd();
		return userData.user.friends.map((index) => {
			return (
				<ContactItem
					key={index}
					content={
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.'
					}
				/>
			);
		});
	}
	console.group('Outside in function');

	console.log({ userData, isLoading, errorsData });
	console.groupEnd();

	// function test(): React.ReactNode {
	// 	if (errorsData) {
	// 		console.log('ERRORS CP');
	// 		return <Errors errorsData={errorsData} />;
	// 	} else if (isLoading) {
	// 		console.log('IS LOADING CP');

	// 		return <IsLoading isLoading={isLoading} />;
	// 	} else {
	// 		return (
	// 			<div className='contactsContainers  gap-4 top-16 sticky'>
	// 				<p className='text-darkGrey pl-2 font-medium text-lg'>
	// 					Contacts
	// 				</p>
	// 				<hr className='bg-darkGrey' />
	// 				{console.log('Is it rendering?')}
	// 				<div className='contactItemsContainer'>
	// 					{createContactItems()}
	// 				</div>
	// 			</div>
	// 		);
	// 	}
	// }

	return <> {test()} </>;
	// return (
	// 	<ShowComponentBasedOnState
	// 		errorsData={errorsData}
	// 		isLoading={isLoading}
	// 		resultComponent={
	// 			<div className='contactsContainers  gap-4 top-16 sticky'>
	// 				<p className='text-darkGrey pl-2 font-medium text-lg'>
	// 					Contacts
	// 				</p>

	// 				<hr className='bg-darkGrey' />
	// 				{console.log('Is it rendering?')}
	// 				<div className='contactItemsContainer'>
	// 					{createContactItems()}
	// 				</div>
	// 			</div>
	// 		}
	// 	/>
	// );
}

export default Contacts;
