import React from 'react';
import { Link, navigate } from 'gatsby';
import { checkUserLoggedIn } from '../../../libs/authUtils';
import ThemeContext from '../../../context/ThemeContext';
import Logo from '../../../images/logo.png';

function Header(): React.ReactElement {
	const userCheck = checkUserLoggedIn();
	const [logFlag, setLogFlag] = React.useState(userCheck);
	const contextValue = React.useContext(ThemeContext);
	const { user } = contextValue;

	function handleLogout() {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		setLogFlag(false);
		navigate('/');
	}

	React.useEffect(() => {
		const userCheck = checkUserLoggedIn();
		setLogFlag(userCheck);
	}, [logFlag]);

	return (
		<header>
			<nav className='shadow-md flex flex-wrap sm:justify-between justify-around items-center bg-white lg:p-13 sm:px-6 text-white'>
				<div className='flex items-center flex-shrink-0 text-white mr-6'>
					<img
						className='w-14 h-14 object-cover'
						src={Logo}
						alt='logo'
					/>
					<span className='font-heebo font-semibold text-blue text-2xl tracking-tight'>
						OdinBook
					</span>
				</div>

				<ul className='flex'>
					<li className='font-heebo mx-4 text-md font-medium text-black'>
						<Link to='/home'>Home</Link>
					</li>

					<li className='font-heebo mx-4 text-md font-medium text-black'>
						<Link to={`/home/user/${user._id}`}>Profile</Link>
					</li>

					{logFlag && (
						<li className='font-heebo mx-4 text-md font-medium text-black'>
							<button onClick={() => handleLogout()}>
								Log Out
							</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default Header;
