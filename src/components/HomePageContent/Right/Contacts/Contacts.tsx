import React from 'react';
import ThemeContext from '../../../../context/ThemeContext';
import { useUserByID } from '../../../../libs/apiUtils';
import { getToken } from '../../../../libs/authUtils';
import { UserType } from '../../../../libs/types';
import Errors from '../../../Reusable/Errors';
import IsLoading from '../../../Reusable/IsLoading';
import ShowCPBasedOnData from '../../../Reusable/ShowCPBasedOnData';
import ContactItem from './ContactItem';

function Contacts(): React.ReactElement {
	const contextValue = React.useContext(ThemeContext);
	const { userData, isLoading, errorsData } = useUserByID(
		contextValue.user._id,
		getToken()
	);

	function createContactItems(): React.ReactNode {
		return userData.user.friends.map((friend: UserType, index: number) => {
			return <ContactItem key={index} friend={friend} />;
		});
	}

	function showContactsContent(): React.ReactNode {
		return (
			<div className='contactsContainers gap-4 top-16 sticky'>
				<p className='text-darkGrey pl-2 font-medium text-lg'>
					Contacts
				</p>

				<hr className='bg-darkGrey' />

				{ShowCPBasedOnData(
					<div className='text-center p-4	'>
						<p>No Contacts Available Yet</p>
					</div>,
					<div className='contactItemsContainer'>
						{createContactItems()}
					</div>,
					userData.user.friends
				)}
			</div>
		);
	}

	return <>{showContactsContent()}</>;
}

export default Contacts;
