import React from 'react';
import './sign.css';
import { useState } from 'react';

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
          window.location.href = '../';
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

  function checkEmail() {
    const email = document.querySelector('#f-email').value; //id값이 "f-email"인 입력란의 값을 저장

    fetch("http://localhost:8080/web/members/emailCheck?email=" + email, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(cnt => {
        if (cnt == 0) { //cnt가 1이 아니면(=0일 경우) -> 사용 가능한 아이디 
          document.querySelector('.email_ok').style.display = 'inline-block';
          document.querySelector('.email_already').style.display = 'none';
        } else { // cnt가 1일 경우 -> 이미 존재하는 아이디
          document.querySelector('.email_already').style.display = 'inline-block';
          document.querySelector('.email_ok').style.display = 'none';
          alert("아이디를 다시 입력해주세요");
          document.getElementById('f-email').value = '';
        }
      })
      .catch(error => {
        console.error(error);
        alert("에러입니다");
      });
  };
  
function checkNickname() {
  const nickname = document.querySelector('#f-nickname').value;

  fetch("http://localhost:8080/web/members/nickCheck?nickname=" + nickname, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => response.json())
    .then(cnt => {
      if (cnt == 0) {
        document.querySelector('.nickname_ok').style.display = 'inline-block';
        document.querySelector('.nickname_already').style.display = 'none';
      } else {
        document.querySelector('.nickname_already').style.display = 'inline-block';
        document.querySelector('.nickname_ok').style.display = 'none';
        alert("닉네임을 다시 입력해주세요");
        document.getElementById('f-nickname').value = '';
      }
    })
    .catch(error => {
      console.error(error);
      alert("에러입니다");
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
            <tbody>
              <tr>
                <th className="email-th">아이디</th>
                <td><input id="f-email" type="email" name="email" className="email" placeholder="email 형식으로 입력해주세요." onInput={checkEmail} />
                  <span className="email_ok">사용 가능한 아이디입니다.</span>
                  <span className="email_already">누군가 이 아이디를 사용하고 있어요.</span>
                </td>
              </tr>
              <tr>
                <th className="password-th">비밀번호</th>
                <td><input type="password" name="password" className="password" /></td>
              </tr>
              <tr>
                <th className="name-th">성함</th>
                <td><input type="name" name="name" className="name" /></td>
              </tr>
              <tr>
                <th className="nickname-th">닉네임</th>
                <td><input id="f-nickname" type="nickname" name="nickname" className="nickname" onInput={checkNickname} />
                  <span className="nickname_ok">사용 가능한 닉네임입니다.</span>
                  <span className="nickname_already">누군가 이 닉네임을 사용하고 있어요.</span>
                </td>
              </tr>
              <tr>
                <th className="tel-th">휴대폰번호</th>
                <td><input type="tel" name="tel" className="tel" /></td>
              </tr>
            </tbody>
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
