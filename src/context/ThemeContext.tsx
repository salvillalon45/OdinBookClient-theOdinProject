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

// Set Up
type ContextProps = {
	children: any;
};

type UserType = {
	first_name: string;
	friend_requests: [];
	friends: [string];
	last_name: string;
	profile_pic_url: string;
	timestamp: string;
	username: string;
};
type ContextType = {
	user: {};
	handleSetUser: (currentUser: UserType) => void;
};

const defaultState = {
	user: {},
	handleSetUser: (currentUser: UserType) => undefined
};
const ThemeContext = React.createContext<ContextType>(defaultState);
// -----------------------------------------------

function ThemeProvider(props: ContextProps): React.ReactElement {
	const [user, setUser] = React.useState({});
	const { children } = props;

	function handleSetUser(currentUser: UserType): void {
		setUser(currentUser);
	}

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
