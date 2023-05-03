import React from 'react';
import axios from 'axios';
import FacebookLogin from '@greatsumini/react-facebook-login';
axios.defaults.withCredentials = true;

function FacebookLoginButton() {
  function facebookLogin(accessToken) {
    const data = {
      "accessToken": accessToken
    };

    axios.post("http://localhost/web/auth/facebookLogin", data)
      .then(response => {
        console.log(response);
        if (response.data.status === 'success') {
          window.location.href = '/';
          alert('페이스북 로그인 성공!');
        } else {
          alert('페이스북 로그인 실패!');
        }
      })
      .catch(exception => {
        alert("페이스북 로그인 오류!");
        console.log(exception);
      });
  }

  return (
    <FacebookLogin
      appId="126327150409089"
      initParams={{
        cookie: true,
        xfbml: true,
        version: 'v16.0',
      }}
      style={{
        backgroundColor: '#4267b2',
        color: '#fff',
        fontSize: '15px',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
      onSuccess={(response) => {
        console.log('Login Success!');
        console.log(response);
        facebookLogin(response.accessToken);
      }}
      onFail={(error) => {
        console.log('Login Failed!');
        console.log('status: ', error.status);
      }}
      onProfileSuccess={(response) => {
        console.log('Get Profile Success!');
        console.log('name: ', response.name);
        console.log(response);
      }}
    />
  );
}

export default FacebookLoginButton;