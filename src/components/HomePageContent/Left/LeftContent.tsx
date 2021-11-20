import React from 'react';
import { Link, PageProps } from 'gatsby';
import ThemeContext from '../../../context/ThemeContext';
import { UserType } from '../../../libs/types';

function LeftContent(): React.ReactElement {
	const contextValue: UserType = React.useContext(ThemeContext);
	const { user } = contextValue;
	const { first_name, last_name, _id } = user;
	console.log('ID');
	console.log(_id);

	return (
		<div className='leftContentContainer'>
			<div className='top-16 sticky'>
				<p className='text-darkGrey pl-2 font-medium text-lg'>
					Your Dashboard
				</p>

				<hr className='bg-darkGrey ml-1' />

				<Link to={`/home/user/${_id}`}>
					{/* <Link to={`/home/user/`}> */}
					<div className='flex hover:bg-greyHover rounded-lg p-1 pl-2 ml-2'>
						<p className='text-lg'>
							<i className='bi bi-person-circle' />
						</p>
						<p className='pl-2 font-medium text-lg'>
							{`${first_name} ${last_name}`}
						</p>
					</div>
				</Link>

				<Link to='#'>
					<div className='flex hover:bg-greyHover rounded-lg p-1 pl-2 ml-2'>
						<p className='text-lg'>
							<i className='bi bi-people-fill' />
						</p>
						<p className='pl-2 font-medium text-lg'>Friends</p>
					</div>
				</Link>
			</div>
			{/* 
			<div>
				<Link to='#'>
					<div className='flex hover:bg-greyHover rounded-tl-lg rounded-bl-lg	p-1 pl-2 ml-2'>
						<p className='text-lg'>
							<i className='bi bi-people-fill' />
						</p>
						<p className='pl-2 font-medium text-lg'>
							Made by Salvador Villalon
						</p>
					</div>
				</Link>
			</div> */}
		</div>
	);
}

export default LeftContent;
