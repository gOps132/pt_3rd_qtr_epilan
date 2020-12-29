import { add_route, reg_template, createDiv } from "../app/template_engine.js";

reg_template('music', () => 
{
    let myDiv = window.document.getElementById(m_app);
    myDiv.innerHTML = "";
    const link1 = createDiv('music',
        `<div><h1>This is the music page </h1><a href='#/'>Go Back to Index</a></div>`
    );
    return myDiv.appendChild(link1);
});

add_route('/music', 'music');
