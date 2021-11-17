import React from 'react';
import { Link } from 'gatsby';
import Contacts from './Contacts';
import ThemeContext from '../../../context/ThemeContext';

function RightContent(): React.ReactElement {
	const contextValue = React.useContext(ThemeContext);
	const { user } = contextValue;
	const { first_name, last_name } = user;

	return (
		<div className='rightContentContainer'>
			<Contacts />
		</div>
	);
}

export default RightContent;
