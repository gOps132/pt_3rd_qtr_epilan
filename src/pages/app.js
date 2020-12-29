import { add_route, reg_template, createLink, m_app } from "../app/template_engine.js";

reg_template('root', () => 
{
    let myDiv = window.document.getElementById(m_app);
    myDiv.innerHTML = "";
    const link1 = createLink('music', 'Go to music', '#/music');
    const link2 = createLink('profile', 'Go to profiles', '#/profile');
    myDiv.appendChild(link1);
    return myDiv.appendChild(link2);
});

add_route('/', 'root');
