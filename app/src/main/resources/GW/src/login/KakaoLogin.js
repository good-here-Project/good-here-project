import KakaoLogin from "react-kakao-login";
import axios from 'axios';

const SocialKakao =()=>{

    const kakaoClientId = '51670af459231beb17bc8f408b62b332'
    const kakaoOnSuccess = async (data)=>{
      	console.log(data);
        //const idToken = data.response.id_token  // 인가코드 백엔드로 전달

      
          axios.post("http://localhost/web/auth/kakaoLogin", { token: data.response.access_token })
            .then(response => {
              console.log(response);
              if (response.data.status === 'success') {
                window.location.href = '/';
                alert('카카오 로그인 성공!');
              } else {
                alert('카카오 로그인 실패!');
              }
            })
            .catch(exception => {
              alert("카카오 로그인 오류!");
              console.log(exception);
            });
        
    }
    const kakaoOnFailure = (error) => {
        console.log(error);
    };
    


    return(
        <>
          <KakaoLogin
              token={kakaoClientId}
              onSuccess={kakaoOnSuccess}
              onFail={kakaoOnFailure}
          />
        </>
    )
}

export default SocialKakao