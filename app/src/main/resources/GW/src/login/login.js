import React from 'react';
import './login.css';
import axios from 'axios';
import FacebookLogin from './FacebookLogin';
import GoogleLogin from './GoogleLogin';
import NaverLogin from './NaverLogin';
import SocialKakao from './KakaoLogin';
axios.defaults.withCredentials = true;

function Login() {

  const userLogin = function() {

    const form = document.querySelector('#login-form');
    const formData = new FormData(form);

    axios.post('http://localhost/web/auth/login', formData)
      .then(response => {
        // console.log(response.data.status);
        if (response.data.status === 'success') {
          window.location.href = '/';
        } else {
          alert('로그인 실패!');
        }
      })
      .catch(error => {
        alert('로그인 오류!');
        console.log(error);
      });
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault(); // 이벤트의 기본 동작을 막음
      userLogin();
    }
  };


  return (
    <div className="loginB">
      <div className="login-body">
        <div className="login-form-img">
          <img src='../img/logo2.png'></img>
        </div>
        <form id="login-form" action="login" method="post" className="login-form">
          <h2>로그인</h2>
          <table>
            <tr>
              <th className="email-th">Email</th>
              <td><input type='email' className='email' name='email'></input></td>
            </tr>
            <tr>
              <th className="password-th">password</th>
              <td><input type='password' className='password' name='password' onKeyDown={handleKeyDown}></input></td>
            </tr>
          </table>

          <div>
            {/* <input type='checkbox' className='checkbox'>ID 저장</input> */}
            <button id="btn-login" type="button" className="btn-login" onClick={userLogin} >Login</button>
          </div>

          <div className="under-line">
            <p className="line1"></p>
            <p className="line2">Or</p>
            <p className="line3"></p>
          </div>
          <div className="login-other">

            <FacebookLogin />

            <GoogleLogin /> 

            <div className="NaverLogin"><NaverLogin /></div>

            <SocialKakao />

          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;