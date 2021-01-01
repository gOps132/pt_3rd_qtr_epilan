import homepage from "Pages/home.html";
import musicpage from "Pages/music.html";
import profilepage from "Pages/profile.html";
import moviespage from "Pages/movies.html";
import other_stuff_1 from "Pages/other_stuff_1.html";
import other_stuff_2 from "Pages/other_stuff_2.html";

export let m_app = 'root';

let routes = {};
let templates = {};

export let reg_template = (template_name, template_callback) => {
  return templates[template_name] = template_callback;
};

// Define the routes. Each route is described with a route path & a template to
// render when entering that path. A template can be a string (file name), or a
// function that will directly create the DOM objects.
export let add_route = (path, template) => {
	if (typeof template == 'function') {
		return routes[path] = template;
	} else if (typeof template == 'string') {
		return routes[path] = templates[template];
	} else {
		return;
	}
};

reg_template('root', () => {
	let div = window.document.getElementById(m_app);
	div.innerHTML = '';
	const html_content = create_html_content(
		'root', homepage);
	div.appendChild(html_content);
});

reg_template('music', () => {
	let div = window.document.getElementById(m_app);
	div.innerHTML = '';
	const html_content =
		create_html_content(
			'music', musicpage);
	return div.appendChild(html_content);
});

reg_template('profile', () => {
	let div = window.document.getElementById(m_app);
	div.innerHTML = '';
	const html_content =
		create_html_content('profile', profilepage);
	return div.appendChild(html_content);
});

reg_template('movies', () => {
	let div = window.document.getElementById(m_app);
	div.innerHTML = '';
	const html_content =
		create_html_content('movies', moviespage);
	return div.appendChild(html_content);
});

reg_template('other_stuff_1', () => {
	let div = window.document.getElementById(m_app);
	div.innerHTML = '';
	const html_content =
		create_html_content('movies', other_stuff_1);
	return div.appendChild(html_content);
});

reg_template('other_stuff_2', () => {
	let div = window.document.getElementById(m_app);
	div.innerHTML = '';
	const html_content =
		create_html_content('movies', other_stuff_2);
	return div.appendChild(html_content);
});


add_route('/', 'root');
add_route('/music', 'music');
add_route('/profile', 'profile');
add_route('/movies', 'movies');
add_route('/other_stuff_1', 'other_stuff_1');
add_route('/other_stuff_2', 'other_stuff_2');

// Generate DOM tree from a string
export let create_html_content = (id, xml_string_or_callback) => {
	let d = window.document.createElement('div');
	d.id = id;

	if (typeof xml_string_or_callback == 'function') {
		d.innerHTML = xml_string_or_callback();
		return d.firstChild;
	} else if (typeof xml_string_or_callback == 'string') {
		d.innerHTML = xml_string_or_callback;
		return d.firstChild;
	}
};

// Helper function to create a link.
export let createLink = (title, text, href) => {
	let a = window.document.createElement('a');
	let linkText = window.document.createTextNode(text);
	a.appendChild(linkText);
	a.title = title;
	a.href = href;
	return a;
};

// Give the correspondent route (template) or fail
let resolveRoute = (route) => {
	try {
		return routes[route];
	} catch (error) {
		throw new Error('The route is not defined');
	}
};

// The actual router, get the current URL and generate the corresponding
// template
let router = (evt) => {
	const url = window.location.hash.slice(1) || '/';
	const routeResolved = resolveRoute(url);
	routeResolved();
};

// For first load or when routes are changed in browser url box.
window.addEventListener('load', router);
window.addEventListener('hashchange', router);