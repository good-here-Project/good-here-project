import React, { useState, useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "../modal/modal";
import UPModal from "../upmodal/upmodal";
import Profil from "../profil/profil";

axios.defaults.withCredentials = true;

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpModalOpen, setIsUpModalOpen] = useState(false);
  const [isProfilOpen, setIsProfilOpen] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handleProfilOpen = () => {
    setIsProfilOpen((prevState) => !prevState);
  }

  const handleProfilClose = () => {
    setIsProfilOpen(false);
  }

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setIsProfilOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpModalOpen = () => {
    setIsUpModalOpen(true);
  };

  const handleUpModalClose = () => {
    setIsUpModalOpen(false);
  };

  const handleUploadComm = () => {
    window.location.href = "/FormComm";
  };

  useEffect(() => {
    axios
      .get("http://localhost/web/auth/user")
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        // console.log(result.status);
        if (result.status === "success") {
          document.querySelector("#nickname").innerHTML = result.data.nickname + "님";
          document.querySelector(".upload").classList.remove("upload");
          document.querySelector(".logout").classList.remove("logout");
          let file = result.data.photo;

          let filepath = file.split("/");
          let filename = filepath[3];

          setPhoto(filename);

        } else {
          document.querySelector(".login").classList.remove("login");
          document.querySelector(".signup").classList.remove("signup");
        }
      })
      .catch((error) => {
        // console.log(error);
        // alert("로그인 사용자 정보 조회 오류!");
      });
  }, []);

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
      <div className="header-head" onClick={handleProfilClose}>
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
          <div>
            <li className="upload" id="upload" onClick={handleModalOpen}>
              Upload
            </li>
          </div>
          <li className="logout" id="logout">
            <img src={`http://xqhwurtrwszc16694936.cdn.ntruss.com/${photo}?type=f&w=40&h=40&ttype=jpg`} onClick={handleProfilOpen}></img>
          </li>
          <li className="nickname-text">
            <span id="nickname"></span>
          </li>
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="modal-main">
          <div className="modal-hotplace" onClick={handleUpModalOpen}>
            <img src="img/hotplace.png"></img>
            <p>Hot 플레이스 업로드</p>
          </div>
          <div className="modal-board" onClick={handleUploadComm}>
            <img src="img/board.png"></img>
            <p>커뮤니티 업로드</p>
          </div>
        </div>
        <div className="modal-text">
          허위 정보나 불법적 내용 혹은 도배성 게시물은
          <br />
          관리자에 의해 삭제될 수 있습니다.
        </div>
      </Modal>

      <UPModal isOpen={isUpModalOpen} onClose={handleUpModalClose}>
        <div className="upmoal-main"></div>
      </UPModal>

      <Profil isOpen={isProfilOpen} onClose={handleProfilClose}>
        <div className="profil-main"></div>
      </Profil>
    </div>
  );
}

export default Header;
