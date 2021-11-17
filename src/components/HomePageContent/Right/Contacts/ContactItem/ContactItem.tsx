import { Link } from 'gatsby';
import React from 'react';

type ContactItemProps = {
	content: string;
};

function ContactItem(props: ContactItemProps): React.ReactElement {
	return (
		<Link to='#'>
			<div className='flex hover:bg-greyHover rounded-lg p-1 pl-2 ml-2 my-4'>
				<p className='text-lg'>
					<i className='bi bi-person-circle' />
				</p>
				<p className='pl-2 font-medium text-lg'>Friend 1</p>
			</div>
		</Link>
	);
}

export default ContactItem;
