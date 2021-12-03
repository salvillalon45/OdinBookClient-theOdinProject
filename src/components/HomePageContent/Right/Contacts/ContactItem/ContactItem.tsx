import { Link } from 'gatsby';
import React from 'react';
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
				<p className='pl-2 font-medium text-lg'>{full_name}</p>
			</div>
		</Link>
	);
}

export default ContactItem;
