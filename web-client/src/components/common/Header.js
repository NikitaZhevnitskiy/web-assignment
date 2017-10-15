import React from 'react';
import {logout, isLogged} from "../../utils/AuthService";


const Header = () => {
    return (

    <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">TODO list</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav navbar-right">
                    {(!isLogged()) ?  <li><a href="/login">LOGIN</a></li> : ""}
                    {(!isLogged()) ?  <li><a href="/signup">SIGUP</a></li> : ""}
                    {(isLogged()) ? <li><a href="/" onClick={()=>logout()}>LOGOUT</a></li> : ""}

                </ul>
            </div>
        </div>
    </nav>
    )
};

export default Header;