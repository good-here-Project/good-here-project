import KakaoLogin from "react-kakao-login";
import axios from 'axios';

const SocialKakao =()=>{

    const kakaoClientId = '51670af459231beb17bc8f408b62b332'
    const kakaoOnSuccess = async (data)=>{
      	console.log(data);
        //const idToken = data.response.id_token  // 인가코드 백엔드로 전달
        const data1 = {
          "access_token": data.response.access_token
        }

      
          axios.post("http://localhost/web/auth/kakaoLogin", data1)
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
              style={{
                color: "black",
                fontWeight: "540",
                backgroundColor: "rgb(255, 235, 0)",
                display: "inline-block",
                padding: "0px",
                width: "210px",
                height: "40px",
                //lineHeight: "49px",
                border: "1px solid lightgray",
                borderRadius: "3px",
                fontSize: "14px",
                textAlign: "center",
                cursor: "pointer",
                marginTop: "7px",
                marginLeft: "0px"
                }}
          />
        </>
    )
}

export default SocialKakao