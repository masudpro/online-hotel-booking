import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../Images/STwithSunForDon-color.gif';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className="header">
          <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top ">
                  <Link className="navbar-brand" to="/"> <img className="logo" src={logo} alt=""/></Link>
                  
                
                <div className="searchInput my-2 pl-md-2 pl-lg-5 d-none d-sm-block">
                  <input className="form-control " type="search" placeholder="  Search Your Destinationarch" />
                  </div>
                  <span className="d-block d-lg-none"> {loggedInUser.photo ? ( <img className="loggedInimage"  src={loggedInUser.photo} alt=""/>) : ( <div></div> )} </span>  
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> 
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/news"  >News</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/destination"  >Destination</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/blog"  >Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact"  >Contact</Link>
                        </li>
                        <li className="nav-item login ml-3">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="">
                            {loggedInUser.photo ? ( <img className="loggedInimage"  src={loggedInUser.photo} alt=""/>) : ( <div></div> )}
                         
                        </li>
                    </ul>
                </div>
          </nav>
        </div>
    );
};

export default Header;