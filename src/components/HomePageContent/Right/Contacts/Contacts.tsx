import React from 'react';
import ContactItem from './ContactItem';

function Contacts(): React.ReactElement {
	function createContactItems(): React.ReactNode {
		return [1, 2, 3, 4, 5].map((index) => {
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

	return (
		<div className='contactsContainers  gap-4 top-16 sticky'>
			<p className='text-darkGrey pl-2 font-medium text-lg'>Contacts</p>

			<hr className='bg-darkGrey' />

			<div className='contactItemsContainer'>{createContactItems()}</div>
		</div>
	);
}

export default Contacts;
