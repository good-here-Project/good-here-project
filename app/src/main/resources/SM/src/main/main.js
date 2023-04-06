import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./main.css";

function Main() {
  return (
    <div className="main">
      <div className="body">
        <div className="cate">
          <ul className="list">
            <li className="hot-place">HOT 플레이스</li>
            <Link to="/Board" style={{ textDecoration: "none" }}>
              <li className="board">커뮤니티</li>
            </Link>
          </ul>
          <ul className="list-best">
            <li>인기순</li>
          </ul>
        </div>
        <div>
          <ul className="mbox">
            <li>
              <img src="img/img1.png"></img>
            </li>
            <li>
              <img src="img/img2.png"></img>
            </li>
            <li>
              <img src="img/img3.png"></img>
            </li>
            <li>
              <img src="img/img4.png"></img>
            </li>
            <li>
              <img src="img/img5.png"></img>
            </li>
            <li>
              <img src="img/img6.png"></img>
            </li>
            <li>
              <img src="img/img7.png"></img>
            </li>
            <li>
              <img src="img/img8.png"></img>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Main;
