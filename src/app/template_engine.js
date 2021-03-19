import homepage from "Pages/home.html";
import webgl_page from "Pages/webgl.html";

const root_div = window.document.getElementById("root");

let routes = {};
let templates = {};

let reg_template = (template_name, template_callback) => {
  return templates[template_name] = template_callback;
};

let add_route = (path, template) => {
	if (typeof template == 'function') {
		return routes[path] = template;
	} else if (typeof template == 'string') {
		return routes[path] = templates[template];
	} else {
		return;
	}
};

let gen_template = (template_name, page_id, template_xml) => {
	reg_template(template_name, () => {
		root_div.innerHTML = '';
		const html_content = create_html_content(
			page_id, template_xml);
		root_div.appendChild(html_content);
	});
}

let create_html_content = (id, xml_string_or_callback) => {
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

let resolveRoute = (route) => {
	try {
		return routes[route];
	} catch (error) {
		throw new Error('The route is not defined');
	}
};

let router = (evt) => {
	const url = window.location.hash.slice(1) || '/';
	const routeResolved = resolveRoute(url);
	routeResolved();
};

gen_template('root', 'root', homepage);
gen_template('webgl', 'webgl-page', webgl_page);
// reg_template('root', () => {
// 	root_div.innerHTML = '';
// 	const html_content = create_html_content(
// 		'root', homepage);
// 	root_div.appendChild(html_content);
// });
// reg_template('webgl', () => {
// 	root_div.innerHTML = '';
// 	const html_content = create_html_content(
// 		'webgl-page', webgl_page);
// 	root_div.appendChild(html_content);
// });

add_route('/', 'root');
add_route('/webgl', 'webgl');

// For first load or when routes are changed in browser url box.
window.addEventListener('load', router);
window.addEventListener('hashchange', router);