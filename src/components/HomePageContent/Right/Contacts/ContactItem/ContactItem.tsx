// React & Gatsby
import React from 'react';
import { Link } from 'gatsby';

// Components
import BoldText from '../../../../Reusable/BoldText';

// Utils
import { UserType } from '../../../../../libs/types';

type ContactItemProps = {
	friend: UserType;
};

function ContactItem({ friend }: ContactItemProps): React.ReactElement {
	const { _id: userid, full_name } = friend;

	return (
		<Link to={`/home/user/${userid}`}>
			<div className='flex hover:bg-greyHover rounded-lg p-1 pl-2 ml-2 my-4'>
				<p className='text-lg'>
					<i className='bi bi-person-circle' />
				</p>

				<BoldText text={full_name} />
			</div>
		</Link>
	);
}

export default ContactItem;
