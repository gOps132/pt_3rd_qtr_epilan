var isNode = typeof module !== 'undefined'

const theme_map = {
	dark: 'light',
	light: 'solar',
	solar: 'dark'
};

const theme = localStorage.getItem('theme') ||
	(tmp = Object.keys(theme_map)[0], localStorage.setItem('theme', tmp), tmp);
const bodyClass = window.document.body.classList;
bodyClass.add(theme);


function toggleTheme() {
	const current = window.localStorage.getItem('theme');
	const next = theme_map[current];

	bodyClass.replace(current, next);
	localStorage.setItem('theme', next);
}

window.document.getElementById('themeButton').onclick = toggleTheme;