import React from 'react';
import ThemeContext from '../../../../context/ThemeContext';
import { useUser } from '../../../../libs/apiUtils';
import { getToken } from '../../../../libs/authUtils';
import { UserType } from '../../../../libs/types';
import Errors from '../../../Reusable/Errors';
import IsLoading from '../../../Reusable/IsLoading';
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
		return userData.user.friends.map((friend: UserType, index: number) => {
			return <ContactItem key={index} friend={friend} />;
		});
	}
	console.group('Outside in function');

	console.log({ userData, isLoading, errorsData });
	console.groupEnd();

	function showComponentBasedOnState(): React.ReactNode {
		if (errorsData) {
			return <Errors errorsData={errorsData} />;
		} else if (isLoading) {
			return <IsLoading isLoading={isLoading} />;
		} else {
			return (
				<div className='contactsContainers  gap-4 top-16 sticky'>
					<p className='text-darkGrey pl-2 font-medium text-lg'>
						Contacts
					</p>
					<hr className='bg-darkGrey' />
					<div className='contactItemsContainer'>
						{createContactItems()}
					</div>
				</div>
			);
		}
	}

	return <> {showComponentBasedOnState()} </>;
}

export default Contacts;
