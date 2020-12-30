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

/*
 * EXPORT TO CLEANER ENV
 */
reg_template('root', () => {
  let myDiv = window.document.getElementById(m_app);
  myDiv.innerHTML = '';
  const link1 = createLink('music', 'Go to music', '#/music');
  const link2 = createLink('profile', 'Go to profiles', '#/profile');
  // myDiv.appendChild(link1);
  // return myDiv.appendChild(link2);
});

reg_template('music', () => {
  let myDiv = window.document.getElementById(m_app);
  myDiv.innerHTML = '';
  const link1 = createDiv(
      'music', 
      `<div class="m-content" id="m-content">
        <div class="m-content-lyrics">
            <h1 class="m-content-lyrics-title">
                Fly Me To The Moon					<br>
            </h1>
            <div class="m-content-lyrics-a-group">
                <h3>By: The Maracons Project</h3>
                <p class="m-content-lyrics">
                    Fly me to the moon 					<br>
                    Let me play among the stars 		<br>
                    And let me see what spring is like	<br>
                    On a-Jupiter and Mars 				<br>
                    In other words, hold my hand 		<br>
                    In other words, baby, kiss me 		<br>
                                                        <br>
                    Fill my heart with song 			<br>
                    And let me sing forevermore 		<br>
                    You are all I long for 				<br>
                    All I worship and adore 			<br>
                    In other words, please be true 		<br>
                    In other words, I love you 			<br>
                                                        <br>
                    Fill my heart with song				<br>
                    Let me sing forevermore				<br>
                    You are all I long for				<br>
                    All I worship and adore				<br>
                    In other words, please be true		<br>
                    In other words, in other words		<br>
                    I love you 							<br>
                </p>
                </div>	
            </div>
        </div>`);
  return myDiv.appendChild(link1);
});

reg_template('profile', () => {
  let myDiv = window.document.getElementById(m_app);
  myDiv.innerHTML = '';
  const link2 = createDiv(
        'profile', 
        `<div>
            <h1>Hello my dudes</h1>
        </div>`
    );
  return myDiv.appendChild(link2);
});

add_route('/', 'root');
add_route('/music', 'music');
add_route('/profile', 'profile');
/*
 * DELETE LATER
 */


// Generate DOM tree from a string
export let createDiv = (id, xml_string_or_callback) => {
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