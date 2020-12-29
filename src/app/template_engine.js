const m_app = "root";

let routes = {};
let templates = {};

export let reg_template = (template_name, template_callback) => {
    return templates[template_name] = template_callback;
};

// Define the routes. Each route is described with a route path & a template to render
// when entering that path. A template can be a string (file name), or a function that
// will directly create the DOM objects.
export let add_route = (path, template) => 
{
    if(typeof template == "function") 
    {
      return routes[path] = template;
    }
    else if(typeof template == "string") 
    {
      return routes[path] = templates[template];
    }
    else 
    {
      return;
    }
};

reg_template('Root', () => 
{
    let myDiv = document.getElementById(m_app);
    myDiv.innerHTML = "";
    const link1 = createLink('view1', 'Go to view1', '#/Music');
    const link2 = createLink('view2', 'Go to view2', '#/view2');
    myDiv.appendChild(link1);
    return myDiv.appendChild(link2);
});
    
reg_template('template-view2', () => 
{
    let myDiv = document.getElementById(m_app);
    myDiv.innerHTML = "";
    const link2 = createDiv('view2', `<div><h1>This is View 2 </h1><a href='#/'>Go Back to Index</a></div>`);
    return myDiv.appendChild(link2);
});

// Map the route->template.
add_route('/', 'Root');
add_route('/view2', 'template-view2');

// Generate DOM tree from a string
let createDiv = (id, xml_string_or_callback) => 
{
    let d = document.createElement('div');
    d.id = id;

    if(typeof xml_string_or_callback == "function")
    {
        d.innerHTML = xml_string_or_callback();
        return d.firstChild;
    } else if(typeof xml_string_or_callback == "string")
    {
        d.innerHTML = xml_string_or_callback;
        return d.firstChild;
    }
};

// Helper function to create a link.
let createLink = (title, text, href) => 
{
    let a = document.createElement('a');
    let linkText = document.createTextNode(text);
    a.appendChild(linkText);
    a.title = title;
    a.href = href;
    return a;
};

// Give the correspondent route (template) or fail
let resolveRoute = (route) => 
{
    try 
    {
     return routes[route];
    }
    catch (error) 
    {
        throw new Error("The route is not defined");
    }
};

// The actual router, get the current URL and generate the corresponding template
let router = (evt) => 
{
    const url = window.location.hash.slice(1) || "/";
    const routeResolved = resolveRoute(url);
    routeResolved();
};

// For first load or when routes are changed in browser url box.
window.addEventListener('load', router);
window.addEventListener('hashchange', router);

