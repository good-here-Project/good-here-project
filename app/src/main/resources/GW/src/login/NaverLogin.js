import React, {useEffect, useRef, useState } from 'react';
import './login.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

const NaverLogin = () => {
  const [tooken, setTooken] = useState("null");
  const { naver } = window
	const NAVER_CLIENT_ID = "3tcMgqH1HbnbC0Jln_f4"// 발급 받은 Client ID 입력 
	const NAVER_CALLBACK_URL = "http://localhost:3000/Login#/naverLogin"// 작성했던 Callback URL 입력

	const initializeNaverLogin = () => {
		const naverLogin = new naver.LoginWithNaverId({
			clientId: NAVER_CLIENT_ID,
			callbackUrl: NAVER_CALLBACK_URL,
          // 팝업창으로 로그인을 진행할 것인지?           
			isPopup: false,
          // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
			loginButton: { color: 'green', type: 3, height: 58 },
			callbackHandle: true,
		})
		naverLogin.init()

      naverLogin.getLoginStatus(async function (status) {
			if (status) {
              // 아래처럼 선택하여 추출이 가능하고, 
				const userid = naverLogin.user.getEmail()
				const username = naverLogin.user.getName()
              // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다. 
              // setUserInfo(naverLogin.user)
			}
		})     
	}
   
	    const userAccessToken = () => {
		    window.location.href.includes('access_token') && getToken()
	}
        
      	const getToken = () => {
          const hash = window.location.hash.substr(1);
          const accessToken = hash.split('=')[1].split('&')[0];
             // console.log, alert 창을 통해 토큰이 잘 추출 되는지 확인하자! 
        		
             // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!   
             setTooken(accessToken);
             console.log(tooken);
	}        
             // 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
	useEffect(() => {
		initializeNaverLogin()
		userAccessToken()
	}, [])

const sendToken = () => {
  if (tooken !== null) {
  axios
  .post(
    "http://localhost/web/auth/naverLogin",
    {},
    {
      params: {
        token: tooken,
      },
    }
  )
  .then((response) => {
    if (response.data.status === "success") {
        window.location.href = '/';
    } else {
      
    }
  })

  .catch((error) => {});
}
}

  return (
    <div id="naverIdLogin" onClick={sendToken()}></div>
  );
};

export default NaverLogin;