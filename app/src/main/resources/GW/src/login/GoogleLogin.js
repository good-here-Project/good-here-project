import React from 'react';
import axios from 'axios';
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
axios.defaults.withCredentials = true;

function GoogleLoginButton() {
  const googleLogin = (credential) => {
    const data = {
      "credential": credential
    }

    console.log(credential);

    axios.post("http://localhost/web/auth/googleLogin", data)
      .then(response => {
        console.log(response);
        if (response.data.status === 'success') {
          window.location.href = '/';
          alert('구글 로그인 성공!');
        } else {
          alert('구글 로그인 실패!');
        }
      })
      .catch(exception => {
        alert("구글 로그인 오류!");
        console.log(exception);
      });
  };

  return (
    <GoogleOAuthProvider clientId="1087840897429-akb84m84c0i06q9p3a81tbglgtqsn28j.apps.googleusercontent.com">
      <GoogleLogin
        scope="https://www.googleapis.com/auth/userinfo.profile"
        onSuccess={(response) => {
          googleLogin(response.credential);
        }}
        onFailure={(error) => {
          console.log(error);
        }}
        size= "large"
        width= "210px"
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginButton;