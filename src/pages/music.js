import { add_route, reg_template} from "../app/template_engine.js";

add_route('/Music', 'template-view1');

reg_template('Music', () => 
{
    let myDiv = window.document.getElementById(m_app);
    myDiv.innerHTML = "";
    const link1 = createDiv('view1',
        `<div><h1>This is the music page </h1><a href='#/'>Go Back to Index</a></div>`
        );
    return myDiv.appendChild(link1);
});