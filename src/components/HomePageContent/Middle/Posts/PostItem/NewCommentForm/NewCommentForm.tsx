// React
import React from 'react';

type NewCommentFormProps = {
	handleNewCommentSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	handleContentChange: (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => void;
	newCommentContent: string;
};

function NewCommentForm({
	handleNewCommentSubmit,
	handleContentChange,
	newCommentContent
}: NewCommentFormProps): React.ReactElement {
	return (
		<div className='newCommentFormWrapperContainer'>
			<form
				className='newCommentFormContainer justify-center flex items-center bg-white my-4 m-auto'
				onSubmit={(event) => handleNewCommentSubmit(event)}
			>
				<label>
					<textarea
						placeholder='Write a comment'
						value={newCommentContent}
						onChange={(event) => handleContentChange(event)}
					/>
				</label>
				<input
					className='ml-4 font-roboto font-bold p-2 rounded-lg text-white bg-blue text-center '
					type='submit'
					value='Submit'
				/>
			</form>
		</div>
	);
}

export default NewCommentForm;
