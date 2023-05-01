// NaverLoginHandler.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NaverLoginHandler = () => {
  // useHistory 훅을 사용해 history 객체를 가져옵니다. 이 객체를 사용하여 라우터 내에서 리다이렉션을 수행할 수 있습니다.
  const navigate = useNavigate();
  console.log("gddggd");

  useEffect(() => {
    const processNaverLogin = async () => {
      // URL의 해시 부분에서 query parameter들을 추출합니다. 이 값들은 access_token, state, token_type, expires_in과 같은 인증 관련 정보를 포함합니다.
      const queryParams = window.location.hash.substring(1).split("&");
      const params = {};
      queryParams.forEach((param) => {
        const [key, value] = param.split("=");
        params[key] = value;
      });

      try {
        const response = await axios.post(
          "http://localhost/web/auth/naverLogin",
          params
        );

        console.log(response);
        alert("네이버 로그인 성공")

        if (response.data.status === "failure") {
          if (response.data.errorCode == "502") {
            alert("네이버 로그인 실패");
          }
        }
        window.location.href = "/"; // 인덱스 페이지로 이동
      } catch (error) {
        console.error("서버에서 naverlogin 에러 옴!");
        console.error(error);
      }
    };

    processNaverLogin();
  }, []);

  return <div>Processing Naver Login...</div>;
};

export default NaverLoginHandler;