module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		backgroundColor: {
			blue: '#1877F2',
			greyBackground: '#f0f2f5',
			green: '#42b72a',
			greyHover: '#e4e6e9',
			white: '#ffffff',
			grey: '#d8dadf'
		},
		textColor: {
			blue: '#1877F2',
			grey: '#d8dadf',
			white: '#ffffff'
		},
		fontFamily: {
			heebo: ['Heebo, sans-serif'],
			roboto: ['Roboto, sans-serif']
		},
		backgroundImage: {}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
