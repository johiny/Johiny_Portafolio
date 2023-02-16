/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		colors: {
			"xiketic" : "#0D0221",
			"midnightBlue" : "#0F084B",
			"darkCornflowerBlue": "#0F084B",
			"lightBlue" : "#A6CFD5",
			"aeroBlue" : "#C2E7D9",
			"cuteWhite": '#F7F5F2',
			"blackText": "#121212",
			"niceGray" : "rgba(194, 231, 217, 0.4)",
			'lightBlack': "rgba(18, 18, 18, 0.5)"
		},
		extend: {},
	},
	plugins: [],
}
