import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

function Header() {
  axios
    .get("http://localhost/web/auth/user")
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
    .then((result) => {
      // console.log(result.status);
      if (result.status === "success") {
        document.querySelector("#nickname").innerHTML = result.data.nickname;
        document.querySelector(".logout").classList.remove("logout");
      } else {
        document.querySelector(".login").classList.remove("login");
        document.querySelector(".signup").classList.remove("signup");
      }
    })
    .catch((error) => {
      // console.log(error);
      // alert("로그인 사용자 정보 조회 오류!");
    });

  function logout() {
    axios("http://localhost/web/auth/logout")
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        result.status = "failure";
        window.location.reload();
      })
      .catch((exception) => {
        console.log(exception);
      });
  }

  return (
    <div className="header">
      <div className="header-head">
        <Link to="/Main" style={{ textDecoration: "none" }}>
          <p>
            <img src="img/logo.png" className="logo"></img>
          </p>
        </Link>
        <Link to="/Main" style={{ textDecoration: "none" }}>
          <p className="logo-text">여기 어때</p>
        </Link>
      </div>
      <div className="header-body">
        <input
          type="text"
          className="search"
          placeholder="Search Item More"
          style={{
            background: "url(img/search.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "28px",
            backgroundPosition: "20px center",
          }}
        ></input>
      </div>
      <div className="header-tail">
        <ul>
          <Link to="/Sign" style={{ textDecoration: "none" }}>
            <li className="signup" id="signup">
              Create
            </li>
          </Link>
          <Link to="/Login" style={{ textDecoration: "none" }}>
            <li className="login" id="login">
              Connect
            </li>
          </Link>
          <li className="logout" id="logout">
            <a onClick={logout}>
              로그아웃(<span id="nickname"></span>)
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
