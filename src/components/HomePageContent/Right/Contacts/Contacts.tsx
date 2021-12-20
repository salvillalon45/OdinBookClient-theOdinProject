// React
import React from 'react';
import ThemeContext from '../../../../context/ThemeContext';

// Components
import BoldText from '../../../Reusable/BoldText';
import HorizontalLine from '../../../Reusable/HorizontalLine';
import ContactItem from './ContactItem';

// Utils
import { useUserByID } from '../../../../libs/apiUtils';
import { getToken } from '../../../../libs/authUtils';
import { UserType } from '../../../../libs/types';
import ShowComponentBasedOnData from '../../../Reusable/ShowComponentBasedOnData';
import getComponentBasedOnState from '../../../Reusable/getComponentBasedOnState';

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
			<div className='contactsContainers gap-4'>
				<BoldText text='Contacts' greyFlag='text-darkGrey' />

				<HorizontalLine />

				{ShowComponentBasedOnData(
					'No Contacts Available Yet',
					<div className='contactItemsContainer'>
						{createContactItems()}
					</div>,
					userData.user.friends
				)}
			</div>
		);
	}

	function showComponentBasedOnState(): React.ReactNode {
		const result = getComponentBasedOnState(errorsData, isLoading);
		if (!!result) {
			return result;
		} else {
			return showContactsContent();
		}
	}

	return <>{showComponentBasedOnState()}</>;
}

export default Contacts;
