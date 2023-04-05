import React from 'react';
import './login.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

function Login() {

  const userLogin = function() {
		
		const form = document.querySelector('#login-form');
		const formData = new FormData(form);
		
		axios.post('http://localhost:8080/web/auth/login', formData)
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
  
  //

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
                <td><input type='password' className='password' name='password'></input></td>
                </tr>
                </table>

                <div>
                    {/* <input type='checkbox' className='checkbox'>ID 저장</input> */}
                    <button id="btn-login" type="button" className="btn-login" onClick={userLogin}>Login</button>
                </div>
                
                <div className="under-line">
                <p className="line1"></p>
                <p className="line2">Or</p>
                <p className="line3"></p>
                </div>
                <div className="login-other">
                <button type="submit" className="btn-facebook">Continue with Facebook</button>
                <button type="submit" className="btn-google">Continue with Google</button>
                </div>
            </form>

            {/* <fb:login-button 
            scope="public_profile,email"
            onlogin="checkLoginState()"></fb:login-button> */}
        </div>
    </div>
  );
}

export default Login;