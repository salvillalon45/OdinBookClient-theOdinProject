import React from 'react';
import { Link } from 'gatsby';
import Contacts from './Contacts';
import ThemeContext from '../../../context/ThemeContext';
import { getToken } from '../../../libs/authUtils';
import { useUser } from '../../../libs/apiUtils';

function RightContent(): React.ReactElement {
	return (
		<div className='rightContentContainer'>
			<Contacts />
		</div>
	);
}

export default RightContent;
