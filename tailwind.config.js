/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				black: '#1f1f1f',
				pink: '#f6339a',
				blue: '#615fff',
				yellow: '#dbff79',
			},
			boxShadow: {
				custom: '9px 9px #1f1f1f',
			},
			fontFamily: {
				sans: ['Nunito Sans', 'sans-serif'],
				display: ['Nunito Sans', 'sans-serif'],
				body: ['Nunito Sans', 'sans-serif'],
			},
			animation: {
				fadeIn: 'fadeIn 0.3s ease-in-out',
				slideInRight: 'slideInRight 0.5s ease-out',
				slideInLeft: 'slideInLeft 0.5s ease-out',
				fadeInOut: 'fadeInOut 0.3s ease-in-out forwards',
				contentFade: 'contentFade 0.4s ease-in-out forwards',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideInRight: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				slideInLeft: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				fadeInOut: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				contentFade: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
			},
		},
	},
	plugins: [],
};
