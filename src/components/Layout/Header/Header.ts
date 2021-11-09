// import React from 'react';
// import { navigate } from 'gatsby';
// import { checkUserLoggedIn } from '../../../lib/utils';

// function Header() {
// 	const userCheck = checkUserLoggedIn();
// 	const [logFlag, setLogFlag] = React.useState(userCheck);

// 	function handleLogout() {
// 		localStorage.removeItem('user');
// 		localStorage.removeItem('token');
// 		setLogFlag(false);
// 		navigate('/');
// 	}

// 	React.useEffect(() => {
// 		const userCheck = checkUserLoggedIn();
// 		setLogFlag(userCheck);
// 	}, [logFlag]);

// 	return (
// 		<nav className='flex sm:justify-between justify-around items-center bg-linearBlue lg:px-20 sm:px-6 py-4 text-white'>
// 			<h3 className='font-lora text-2xl'>Sal Blog</h3>

// 			<ul className='flex'>
// 				{logFlag && (
// 					<li className='font-lora mx-4 text-xl'>
// 						<button onClick={() => handleLogout()}>Log Out</button>
// 					</li>
// 				)}
// 			</ul>
// 		</nav>
// 	);
// }

// export default Header;
