import React from 'react';
import { Link } from "react-router-dom";
import './profil.css';
import axios from "axios";

axios.defaults.withCredentials = true;

function Profil(props) {
  const { isOpen, onClose } = props;

  if (!isOpen) {
    return null;
  }

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
    <div className="profil-background" onClick={e => {
      // 모달 내부를 클릭한 경우에는 모달이 닫히지 않도록 합니다.
      if (e.target.closest('.profil') !== null) {
        return;
      }
      onClose();
    }}>
			<div>
				<div className="profil-overlay">
					<div className="profil">
						<div className="profil-content">
							<ul>
                <div onClick={onClose}>
                  <Link to="/Info" style={{ textDecoration: "none" }}>
                    <li>내 프로필</li>
                  </Link>
                </div>
                <div onClick={onClose}>
                  <Link to="/List" style={{ textDecoration: "none" }}>
                    <li>내 게시글</li>
                  </Link>
                </div>
                <div onClick={onClose}>
                  <Link to="/Question" style={{ textDecoration: "none" }}>
                    <li>문의하기</li>
                  </Link>
                </div>
                <Link to="/Main" style={{ textDecoration: "none" }}>
                  <li onClick={logout}>Logout</li>
                </Link>

							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
  );
}

export default Profil;