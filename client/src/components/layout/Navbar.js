import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MetaMaskAvatar } from 'react-metamask-avatar';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

import Login from '../auth/Login';
import Register from '../auth/Register';

import TutorialHub from '../../assets/images/TutorialHub.png';

import { ReactComponent as Roulette } from '../../assets/images/roulette.svg';
import { ReactComponent as PVP } from '../../assets/images/pvp.svg';
import { ReactComponent as Unboxing } from '../../assets/images/unboxing.svg';

const Navbar = () => {
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleRegister, setToggleRegister] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [address, setAddress] = useState("");
  const [data, setData] = useState("");

  const changeAuthentication = (publicAddress) => {
    console.log("sign in with metamask", publicAddress);
    if(publicAddress !== "") {
      setAddress(publicAddress);
      setIsAuthenticated(true);
      axios.get('http://localhost:3001/signedIn', {
      params: {
        Address: publicAddress,
      },
    })
    .then(response => {
      // Handle the successful response
      setData(response.body);
      console.log(response.body);
    })
    .catch(error => {
      // Handle errors
      console.error('Error fetching data:', error);
    });
    } else {
      setAddress("");
      setIsAuthenticated(false); 
    }
  }

  const showLogin = () => {
    if (toggleRegister)
      setToggleRegister(false);
    setToggleLogin(!toggleLogin);
  }

  const showRegister = () => {
    if (toggleLogin)
      setToggleLogin(false);
    setToggleRegister(!toggleRegister);
  }

  const logout = () => {
    setAddress("");
    setIsAuthenticated(false);
  }

  useEffect(() => {
    setToggleLogin(false);
    setToggleRegister(false);
  }, [])


  return (
    <nav class="navbar-header" className="nav">
      <div className="leftsidenav">
        <Link className="link-logo" to="/"><img src={TutorialHub} className="logo" alt="TutorialHub"></img></Link>
        <ul className="nav-games">
          <li className="page">
            <Link className="navlink" to="/discover">
              <cw-icon className="nav-icon">
                <Roulette /> 
              </cw-icon>
              <span className="name">Discover</span>
            </Link>
          </li>
          <li className="page">
            <Link className="navlink" to="/explore">
              <cw-icon className="nav-icon">
                <Unboxing />
              </cw-icon>
              <span className="name">Explore</span>
            </Link>
          </li>
          <li className="page">
            <Link className="navlink" to="/preferences">
              <cw-icon className="nav-icon">
                <PVP /> 
              </cw-icon>
              <span className="name">Preferences</span>
            </Link>
          </li>
        </ul>
      </div>
      {!isAuthenticated ? (
        <div className="rightsidenav">
        <button className="auth register" onClick={showRegister} >
          REGISTER
        </button>
        {toggleRegister ? <Register toggle={showRegister}/> : null}
        <button className="auth login" onClick={showLogin}>
          LOGIN
        </button>
        {toggleLogin ? <Login toggle={showLogin} changeAuthentication={changeAuthentication} /> : null}
      </div>
  ) : (
    <div className="authrightsidenav">
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="signout" className="profile-label">
          <MetaMaskAvatar address={address} size={24} className="inline"/>
          <p className="address-display">{address.substring()}</p>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )}

    </nav>
  );
}

export default Navbar;