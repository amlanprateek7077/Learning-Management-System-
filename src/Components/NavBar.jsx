import { Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";


export default () => {

    return (

        <header>
            <nav>
                <div className="logo"><img src={`/logo.png `} /><h2>Edu</h2><span>Web</span></div>

                <input type="checkbox" id="menu-bar" />
                <label htmlFor="menu-bar"><FontAwesomeIcon className="icon" icon={faBars} /></label>

                <div className="elements">
                    <p><Link to="/" className="active">Home</Link></p>
                    <p><Link to="/about">About</Link></p>
                    <p><Link to="/contact">Contact</Link></p>
                    <div className="buttons">
                        <button><Link to={`/login/student`}>Student Login</Link></button>
                        <button><Link to={`/login/teacher`}>Teacher Login</Link></button>
                    </div>
                </div>

            </nav>
        </header >
    )
       

}




// onChange={()=>{
//     let x=true;
//     if(x){
//         document.querySelector("main").style.background = "black";
//         x=false;    
//     }else{
//         document.querySelector("main").style.background = "blue";
//         x=true;
//     }
// }}