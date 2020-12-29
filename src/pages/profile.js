import { add_route, reg_template, createDiv } from "../app/template_engine.js";

reg_template('profile', () => 
{
    let myDiv = window.document.getElementById(m_app);
    myDiv.innerHTML = "";
    const link2 = createDiv('profile', `<div><h1>This is View 2 </h1><a href='#/'>Go Back to Index</a></div>`);
    return myDiv.appendChild(link2);
});

add_route('/profile', 'profile');
