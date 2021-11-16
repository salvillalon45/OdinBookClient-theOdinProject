import React from 'react';
import { Link } from 'gatsby';
import ThemeContext from '../../../context/ThemeContext';

function LeftContent(): React.ReactElement {
	const contextValue = React.useContext(ThemeContext);
	const { user } = contextValue;
	const { first_name, last_name } = user;

	return (
		<div className='leftContentContainer'>
			<Link to='#'>
				<div className='flex hover:bg-greyHover rounded-tl-lg rounded-bl-lg	p-1 pl-2 ml-2'>
					<p className='text-lg'>
						<i className='bi bi-person-circle' />
					</p>
					<p className='pl-2 font-medium text-lg'>
						{`${first_name} ${last_name}`}
					</p>
				</div>
			</Link>

			<Link to='#'>
				<div className='flex hover:bg-greyHover rounded-tl-lg rounded-bl-lg	p-1 pl-2 ml-2'>
					<p className='text-lg'>
						<i className='bi bi-people-fill' />
					</p>
					<p className='pl-2 font-medium text-lg'>Friends</p>
				</div>
			</Link>

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
