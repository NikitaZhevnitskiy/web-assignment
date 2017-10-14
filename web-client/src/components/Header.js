import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-default">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/">To-Do list</Link>
            </div>
            <ul className="nav navbar-nav navbar-right">
                <Link to="/login"><li><button className="btn btn-info log">Log In</button></li></Link>
                <Link to="/signup"><li><button className="btn btn-danger log">Sign up</button></li></Link>
            </ul>
        </nav>
    )
};

export default Header;