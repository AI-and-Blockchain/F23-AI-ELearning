import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

import { ReactComponent as SteamLogo } from "../../assets/images/steam.svg";

import '../../assets/css/popup.css'; 

const Login = ({toggle, changeAuthentication}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const onPressConnect = async () => {
    setLoading(true);

    try {
      if (window.ethereum.isMetaMask) {
        // Desktop browser
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const account = Web3.utils.toChecksumAddress(accounts[0]);
        setAddress(account);
        changeAuthentication(account);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onPressLogout = () => {
    setAddress("");
    changeAuthentication("");
  }


  const handleLogin = async (e) => {
    e.preventDefault()
    toggle()
  }

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [])
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2 className="login-title">LOGIN</h2>
        <div className="steam-container">
          <button className="steam-api-button">
            Dont have an account? Sign up here
        </button>
        <div>
        {address && !loading ? (
        <button onClick={onPressLogout} className="metamask-api-button">
          Disconnect
        </button>
      ) : loading ? (
        <button
          className={`${"metamask-api-button"} ${"metamask-api-loading"}`}
          disabled
        >
          <div>Loading...</div>
        </button>
      ) : (
        <button onClick={onPressConnect} className="metamask-api-button">
          Sign In With MetaMask
        </button>
      )}
      
    </div>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <label className="email-input">
            Email*
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email Address'/>
          </label>
          <label className="password-input">
            Password*
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password'/>
          </label>
          <button type="submit">SUBMIT</button>
        </form>
        <button onClick={toggle}>Close</button>
      </div>
    </div>
  );
}

export default Login;