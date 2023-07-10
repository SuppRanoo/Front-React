import './Login.css';
import React, { useState } from 'react';
import pwdLogo from "../../assets/lock-circle-svgrepo-com.svg";
import usrLogo from '../../assets/user-circle-svgrepo-com.svg';
import visibleYes from "../../assets/nothiddenpw.svg";
import visibleNo from "../../assets/hiddenpw.svg";
import { useNavigate } from 'react-router-dom';
import { sleep } from "../../App";
import { } from '@reduxjs/toolkit';
import { Axios } from 'axios';

const axios = new Axios();
var visibility = visibleNo;

const Login = () => {

  const [bx, setBx] = useState('');
  const loginNavigator = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const [borderInput, setBorderInput] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [positionLeft, setPositionLeft] = useState('0');
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [logOpacity, setLogOpacity] = useState('0');

  const date = new Date();
  let year = date.getFullYear();

  const nav = (r: string) => {
    document.querySelector(".Login")?.classList.remove("loaded");
    setTimeout(() => {
      document.querySelector(".Login")?.classList.add("hidden");
      loginNavigator(r);
    }, 100);
  }

  const validUsername = (u: string) => {
    var tmp: string = u;
    let reg: RegExp = /\p{P}/gu;
    var testplus = "$£¤+=|`^~".split('');

    var flag1 = true;
    if ((tmp.length < 5 || tmp.length > 50) && tmp != "") { //username must be between 5-50 characters.
      flag1 = false;
    }
    var flag2 = true;
    testplus.forEach(e => {
      if (tmp.split('').includes(e)) { //username must not contain punctuations
        flag2 = false;
      }
    });
    var flag3 = true;
    if (reg.test(tmp)) { // check if the username contains punctuation
      flag3 = false;
    }
    var flag4 = true;
    if (isNumeric(tmp[0])) { // check if the username starts with a number
      flag4 = false;
    }
    if (flag1 && flag2 && flag3 && flag4) {
      return true;
    } else { return false }
  }

  const authenticate = async () => {
    setButtonEnabled(true);

    if (validUsername(username) && password.length <= 8) { //1: successful login
      nav('/');
    }
    else { //2: failed login
      setBx('0px 0px 0.5rem #D21312');
      setBorderInput('2px solid #D21312');
      setUserName(''); setPassWord('');
      var offset: number = 0;
      var rightOff: number = 15;
      var leftOff: number = -15;
      var i = 0;
      while (i < 3) {
        while (offset < rightOff) {
          offset += 2;
          await sleep(1);
          setPositionLeft(`${offset}px`);
        }
        while (offset > leftOff) {
          offset -= 2;
          await sleep(1);
          setPositionLeft(`${offset}px`);
        }
        while (offset < 0) {
          offset += 2;
          await sleep(1);
          setPositionLeft(`${offset}px`);
        }
        i++;
      }
    }
    setButtonEnabled(false);
    setBx('');
  }
  setTimeout(() => {
    setLogOpacity('1');
  }, 150);
  return (
    <>
      <div id='Login' className="Login" style={{ 'opacity': logOpacity }}>
        <div className="login">
          <form id='loginForm' autoComplete='off'>
            <h4 className='titleLogin'>Login to X4Hire</h4>
            <table className='loginTable'>
              <tbody>
                <tr>
                  <td className="filll">
                    <img id='usernameLogo' src={usrLogo} />
                    <input autoFocus itemID='username' id='username' type='text' placeholder='username or email' value={username}
                      style={{ 'border': borderInput }}
                      onChange={event => setUserName(event.target.value)}
                      onInput={() => { setBorderInput(''); }}
                      onMouseOver={() => { setBorderInput(''); }}
                      onKeyDown={(event: React.KeyboardEvent) => {
                        if (event.key == "Enter") {
                          document.getElementById('password')?.focus();
                        }
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table className='loginTable'>
              <tbody>
                <tr>
                  <td className="filll">
                    <img id='passwordLogo' src={pwdLogo} />
                    <input itemID='password' id='password' placeholder='password' type={passwordShown ? "text" : "password"} value={password}
                      style={{ 'border': borderInput }}
                      onChange={event => setPassWord(event.target.value)}
                      onMouseOver={() => { setBorderInput(''); }}
                      onKeyDown={(event: React.KeyboardEvent) => {
                        if (event.key == "Enter") {
                          setButtonEnabled(true);
                          document.getElementById('authenticate')?.focus();
                          setButtonEnabled(false);
                        }
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='zero'>
              <img id='pwdVisiblityLogo' src={visibility} onClick={() => { if (passwordShown) { setPasswordShown(false); visibility = visibleNo; } else { setPasswordShown(true); visibility = visibleYes; } }} />
            </div>
            <a className='forgot anchor' onClick={() => { nav('/recover'); }}>Forgot password</a>
            <br></br>
            <input style={{ 'position': 'relative', 'left': positionLeft, 'boxShadow': bx }} className='authenticate' id='authenticate' type="button" value='Authenticate' disabled={buttonEnabled}
              onClick={() => {
                setButtonEnabled(true);
                authenticate();
                setButtonEnabled(false);
              }} />
          </form>
        </div>
        <div className='gotoregister'>
          Need an account ? <a style={{ 'marginLeft': '10px' }} className='anchor' onClick={() => { nav('/register') }} >Register now</a><br />
        </div>
        <div style={{ 'fontSize': '12px', 'marginTop': '10px' }}>
          X4Hire - {year}
        </div>
      </div>
    </>
  )
}

function isNumeric(arg0: string) {
  if (arg0.match(/^-?\d+$/) || arg0.match(/^\d+\.\d+$/)) {
    return true; // is an integer(1st condition) or float(2nd condition) .. (positive/negative check already included in the regex so don't worry)
  }
  else {
    return false; //not a number
  }
}

export default Login;