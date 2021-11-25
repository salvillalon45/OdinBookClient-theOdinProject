import React from 'react';

type AboutProps = {
	about_text: string;
	date_joined: string;
	full_name: string;
};

function About({
	full_name,
	about_text,
	date_joined
}: AboutProps): React.ReactElement {
	return (
		<div className='aboutContainer'>
			<div className='tabHeaderContainer w-10/12 m-auto'>
				<p className='text-darkGrey font-medium text-lg'>
					About {full_name}
				</p>

				<hr className='bg-darkGrey mt-2 h-0.5' />
			</div>

			<div className='aboutMeWrapperContainer flex flex-wrap mt-4 sm:px-40 px-8	'>
				<p>{about_text}</p>

				<p className='text-darkGrey font-medium text-md mt-4'>
					Joined On {date_joined}
				</p>
			</div>
		</div>
	);
}

export default About;
