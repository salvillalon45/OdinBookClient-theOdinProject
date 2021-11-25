import { Link } from 'gatsby';
import React from 'react';

type UserLinkTextProps = {
	userid: string;
	full_name: string;
	flag: string;
};

function UserLinkText({
	userid,
	full_name,
	flag
}: UserLinkTextProps): React.ReactElement {
	return (
		<Link to={`/home/user/${userid}`}>
			<p
				className={`hover:underline text-md font-medium text-black ${
					flag === 'comment' ? 'font-semibold' : ''
				} `}
			>
				{full_name}
			</p>
		</Link>
	);
}

export default UserLinkText;
