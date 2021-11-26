import React from 'react';
import ThemeContext from '../../../context/ThemeContext';
import { usePosts } from '../../../libs/apiUtils';
import Posts from './Posts';
import ShowComponentBasedOnState from '../../Reusable/ShowComponentBasedOnState';

function MiddleContent(): React.ReactElement {
	const contextValue = React.useContext(ThemeContext);
	const { _id: userid } = contextValue.user;
	const authorization: string = localStorage.getItem('token') ?? '';
	const { allPosts, isLoading, errorsData } = usePosts(userid, authorization);
	console.log({ allPosts, errorsData, isLoading });
	return (
		<div className='middleContentContainer col-span-2 m-auto'>
			<p className='text-darkGrey pl-2 font-medium text-lg'>Timeline</p>

			<hr className='bg-darkGrey ml-1' />

			<ShowComponentBasedOnState
				errorsData={errorsData}
				isLoading={isLoading}
				resultComponent={<Posts posts={allPosts && allPosts.posts} />}
			/>
		</div>
	);
}

export default MiddleContent;
