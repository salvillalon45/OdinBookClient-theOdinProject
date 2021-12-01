import jwt_decode, { JwtPayload } from 'jwt-decode';

function getToken(): string {
	return localStorage.getItem('token') ?? '';
}

function checkUserLoggedIn() {
	try {
		const token = localStorage.getItem('token') ?? '';
		const user = localStorage.getItem('user') ?? '';
		const decoded = jwt_decode<JwtPayload>(token);
		// const decoded = jwt_decode<JwtPayload>(token || '') || null;

		if (user === '') {
			return false;
		}

		if (token && decoded) {
			const expiry = decoded.exp ?? 0;
			const now = new Date();

			if (expiry === 0) {
				return false;
			}

			if (now.getTime() > expiry * 1000) {
				// Token expired
				return false;
			} else {
				// Valid token
				return true;
			}
		}

		return true;
	} catch (error) {
		return false;
	}
}

export { checkUserLoggedIn, getToken };
