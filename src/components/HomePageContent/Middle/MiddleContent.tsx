import React from 'react';
import ThemeContext from '../../../context/ThemeContext';
import { usePosts } from '../../../libs/apiUtils';
import Posts from './Posts';
import Errors from '../../Reusable/Errors';
import IsLoading from '../../Reusable/IsLoading';
import { getToken } from '../../../libs/authUtils';

function MiddleContent(): React.ReactElement {
	const contextValue = React.useContext(ThemeContext);
	const { _id: userid } = contextValue.user;
	const { allPosts, isLoading, errorsData } = usePosts(userid, getToken());

	function showComponentBasedOnState(): React.ReactNode {
		if (errorsData) {
			return <Errors errorsData={errorsData} />;
		} else if (isLoading) {
			return <IsLoading isLoading={isLoading} />;
		} else {
			return (
				<div className='middleContentContainer col-span-2 m-auto'>
					<p className='text-darkGrey pl-2 font-medium text-lg'>
						Timeline
					</p>

					<hr className='bg-darkGrey ml-1' />

					<Posts posts={allPosts.posts} />
				</div>
			);
		}
	}

	return <>{showComponentBasedOnState()}</>;
}

export default MiddleContent;
