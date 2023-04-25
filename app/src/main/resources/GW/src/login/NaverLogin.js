import { useEffect, useRef } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css";

const NaverLogin = (props) => {
  const { naver } = window;
  const NAVER_CLIENT_ID = "3tcMgqH1HbnbC0Jln_f4"; // 발급 받은 Client ID 입력
  const NAVER_CALLBACK_URL = "http://localhost:3000/auth/naverLogin"; // 작성했던 Callback URL 입력
  const naverRef = useRef();

  // 네이버 로그인 기능 및 버튼 구현
  const naverLogin = new naver.LoginWithNaverId({
    clientId: NAVER_CLIENT_ID, // Naver Developer 에 있는 Client ID
    callbackUrl: NAVER_CALLBACK_URL, // 요청 보냈을때 네이버에서 응답해 줄 주소
    isPopup: false, // 네이버 로그인 확인 창을 팝업으로 띄울지 여부
    loginButton: {
      color: "green", // green, white
      type: 3, // 1: 작은버튼, 2: 중간버튼, 3: 큰 버튼
      height: 50, // 크기는 높이로 결정한다.
    },
  });

  useEffect(() => {
    naverLogin.init();
  }, []);

  const handleClick = () => {
    naverRef.current.children[0].click();
  };

    return (
    <>
      <div id="naverIdLogin" ref={naverRef}></div>
      <div onClick={handleClick}></div>
      <NaverLoginHandler />
    </>
  );
};

export default NaverLogin;