import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MetaMaskAvatar } from 'react-metamask-avatar';

import Login from '../auth/Login';
import Register from '../auth/Register';

import TutorialHub from '../../assets/images/TutorialHub.png';

import { ReactComponent as Roulette } from '../../assets/images/roulette.svg';
import { ReactComponent as PVP } from '../../assets/images/pvp.svg';
import { ReactComponent as Unboxing } from '../../assets/images/unboxing.svg';
import { ReactComponent as Crash } from '../../assets/images/crash.svg';
import { ReactComponent as Steam } from '../../assets/images/steam.svg';

const Navbar = () => {
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleRegister, setToggleRegister] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [address, setAddress] = useState("");

  const changeAuthentication = (publicAddress) => {
    console.log("sign in with metamask", publicAddress);
    if(publicAddress !== "") {
      setAddress(publicAddress);
      setIsAuthenticated(true);
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
      <MetaMaskAvatar address={address} size={24} />
      <p className="address-display">{address}</p>
    </div>
  )}

    </nav>
  );
}

export default Navbar;