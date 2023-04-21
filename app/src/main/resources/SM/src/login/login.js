import React from "react";
import "./login.css";
import axios from "axios";
import FacebookLogin from "@greatsumini/react-facebook-login";
axios.defaults.withCredentials = true;

function Login() {
  const previousUrl = document.referrer;
  const userLogin = function () {
    const form = document.querySelector("#login-form");
    const formData = new FormData(form);

    axios
      .post("http://localhost/web/auth/login", formData)
      .then((response) => {
        // console.log(response.data.status);
        if (response.data.status === "success") {
          if (previousUrl) {
            window.location.href = previousUrl;
          } else {
            window.location.href = "/";
          }
        } else {
          alert("로그인 실패!");
        }
      })
      .catch((error) => {
        alert("로그인 오류!");
        console.log(error);
      });
  };

  // ---------------------------------페이스북 로그인-----------------------------------
  function facebookLogin(accessToken) {
    const data = {
      accessToken: accessToken,
    };

    axios
      .post("http://localhost/web/auth/facebookLogin", data)
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          window.location.href = "/";
          alert("페이스북 로그인 성공!");
        } else {
          alert("페이스북 로그인 실패!");
        }
      })
      .catch((exception) => {
        alert("페이스북 로그인 오류!");
        console.log(exception);
      });
  }

  return (
    <div className="loginB">
      <div className="login-body">
        <div className="login-form-img">
          <img src="../img/logo2.png"></img>
        </div>
        <form
          id="login-form"
          action="login"
          method="post"
          className="login-form"
        >
          <h2>로그인</h2>
          <table>
            <tr>
              <th className="email-th">Email</th>
              <td>
                <input type="email" className="email" name="email"></input>
              </td>
            </tr>
            <tr>
              <th className="password-th">password</th>
              <td>
                <input
                  type="password"
                  className="password"
                  name="password"
                ></input>
              </td>
            </tr>
          </table>

          <div>
            {/* <input type='checkbox' className='checkbox'>ID 저장</input> */}
            <button
              id="btn-login"
              type="button"
              className="btn-login"
              onClick={userLogin}
            >
              Login
            </button>
          </div>

          <div className="under-line">
            <p className="line1"></p>
            <p className="line2">Or</p>
            <p className="line3"></p>
          </div>
          <div className="login-other">
            <FacebookLogin
              appId="126327150409089"
              initParams={{
                cookie: true,
                xfbml: true,
                version: "v16.0",
              }}
              style={{
                backgroundColor: "#4267b2",
                color: "#fff",
                fontSize: "16px",
                padding: "12px 24px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onSuccess={(response) => {
                console.log("Login Success!");
                console.log(response);
                facebookLogin(response.accessToken);
              }}
              onFail={(error) => {
                console.log("Login Failed!");
                console.log("status: ", error.status);
              }}
              onProfileSuccess={(response) => {
                console.log("Get Profile Success!");
                console.log("name: ", response.name);
                console.log(response);
              }}
            />
            <button type="submit" className="btn-google">
              Continue with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
