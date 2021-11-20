// -----------------------------------------------
//
// Context -> ThemeContext.js
// Desc: React Context that allows props to be global
// and be passed around in Components!
//
// -----------------------------------------------

// -----------------------------------------------
// Imports
import * as React from 'react';

import { UserType } from '../libs/types';

// Set Up
type ContextProps = {
	children: any;
};

type ContextType = {
	user: UserType;
	handleSetUser: (currentUser: UserType) => void;
};

const userObj: UserType = {
	_id: '',
	first_name: '',
	friend_requests: [],
	friends: [],
	last_name: '',
	profile_pic_url: '',
	timestamp: '',
	username: ''
};

const defaultState = {
	user: userObj,
	handleSetUser: (currentUser: UserType) => undefined
};
const ThemeContext = React.createContext<ContextType>(defaultState);
// -----------------------------------------------

function ThemeProvider(props: ContextProps): React.ReactElement {
	const [user, setUser] = React.useState(userObj);
	const { children } = props;

	function handleSetUser(currentUser: UserType): void {
		setUser(currentUser);
	}
	console.log({ user });
	return (
		<ThemeContext.Provider
			value={{
				user,
				handleSetUser: handleSetUser
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export default ThemeContext;

export { ThemeProvider };
