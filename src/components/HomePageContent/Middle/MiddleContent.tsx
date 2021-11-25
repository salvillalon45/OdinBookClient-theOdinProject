import React from 'react';
import ThemeContext from '../../../context/ThemeContext';
import { usePosts } from '../../../libs/apiUtils';
import Posts from './Posts';
import CircularProgress from '@mui/material/CircularProgress';

function MiddleContent(): React.ReactElement {
	const contextValue = React.useContext(ThemeContext);
	const { _id: userid } = contextValue.user;
	const authorization: string = localStorage.getItem('token') ?? '';
	const { allPosts, isLoading, isError } = usePosts(userid, authorization);

	return (
		<div className='middleContentContainer col-span-2 m-auto'>
			<p className='text-darkGrey pl-2 font-medium text-lg'>Timeline</p>

			<hr className='bg-darkGrey ml-1' />

			{isLoading ? (
				<div>
					<CircularProgress />
				</div>
			) : (
				<Posts posts={allPosts.posts} />
			)}
		</div>
	);
}

export default MiddleContent;
