import React from 'react';
import { Link } from 'gatsby';
import Contacts from './Contacts';
import ThemeContext from '../../../context/ThemeContext';
import { getToken } from '../../../libs/authUtils';
import { useUser } from '../../../libs/apiUtils';

function RightContent(): React.ReactElement {
	const contextValue = React.useContext(ThemeContext);
	const { user } = contextValue;

	const { first_name, last_name, _id: userid } = user;
	// const { user, isLoading, errorsData } = useUser(userid, getToken());

	return (
		<div className='rightContentContainer'>
			<Contacts />
		</div>
	);
}

export default RightContent;
