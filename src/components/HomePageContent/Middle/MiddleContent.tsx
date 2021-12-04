import React from 'react';
import ThemeContext from '../../../context/ThemeContext';
import { executeRESTMethod, usePosts } from '../../../libs/apiUtils';
import Posts from './Posts';
import Errors from '../../Reusable/Errors';
import IsLoading from '../../Reusable/IsLoading';
import { getToken } from '../../../libs/authUtils';
import { useSWRConfig } from 'swr';

function MiddleContent(): React.ReactElement {
	const [newPostContent, setNewPostContent] = React.useState('');
	const { mutate } = useSWRConfig();
	const contextValue = React.useContext(ThemeContext);
	const { _id: userid } = contextValue.user;
	const { allPosts, isLoading, errorsData } = usePosts(userid, getToken());

	function handleContentChange(
		event: React.ChangeEvent<HTMLTextAreaElement>
	): void {
		setNewPostContent(event.target.value);
	}

	async function handleNewPostSubmit(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();
		await executeRESTMethod('post', `posts/`, getToken(), {
			content: newPostContent,
			userid
		});
		await mutate([
			`${process.env.GATSBY_ODIN_BOOK}/posts/${userid}`,
			getToken()
		]);
	}

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

					<div>
						<form onSubmit={(event) => handleNewPostSubmit(event)}>
							<label>
								<textarea
									placeholder="What's on your mind"
									value={newPostContent}
									onChange={(event) =>
										handleContentChange(event)
									}
								/>
							</label>
							<input type='submit' value='Submit' />
						</form>
					</div>

					<Posts posts={allPosts.posts} />
				</div>
			);
		}
	}

	return <>{showComponentBasedOnState()}</>;
}

export default MiddleContent;
