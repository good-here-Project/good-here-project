import React from 'react';
import './sign.css';

function Sign() {

  const signUp = function() {
    const form = document.querySelector("#member-form");
    const formData = new FormData(form);
  
    let json = JSON.stringify(Object.fromEntries(formData));
    // console.log(json);
    fetch("http://localhost:8080/web/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    })
      .then((response) => {
        console.log(json);
        return response.json();
      })
      .then((result) => {
        if (result.status == "success") {
          window.location.href='../';
        } else {
          alert("입력 실패!");
          console.log(result.data);
        }
      })
      .catch((exception) => {
        alert("입력 중 오류 발생!");
        console.log(exception);
      });
  };

  return (
    <div className="signB">
			<div className="member-body">
          <div className="member-form-img">
					<img src='../img/logo2.png'></img>
          </div>
          <form id="member-form" className="member-form">
            <h3>회원가입</h3>
						<table>
            <tr>
              <th className="email-th">이름</th>
              <td><input type="name" name="name" 
                   className="name"/></td>
            </tr>
            <tr>
              <th className="email-th">NickName</th>
              <td><input type="nickname" name="nickname" 
                   className="nickname"/></td>
            </tr>
						<tr>
							<th className="email-th">Email</th>
							<td><input type="email" name="email" 
									 className="email"/></td>
						</tr>
						<tr>
							<th className="password-th">password</th>
							<td><input type="password" name="password" className="password"/></td>
						</tr>
            <tr>
							<th className="password-th">tel</th>
							<td><input type="tel" name="tel" className="tel"/></td>
						</tr>
						</table>
						
						<div>
							<button type="submit" className="btn btn-primary" id="btn-insert" onClick={signUp}>생성하기</button>
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
      </div>
    </div>
  );
}

export default Sign;
