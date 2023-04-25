import React from 'react';
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
      if (e.target.closest('.modal') !== null) {
        return;
      }
      onClose();
    }}>
			<div>
				<div className="profil-overlay">
					<div className="profil">
						<div className="profil-content">
							<ul>

								<li>내정보</li>
								<li>임시</li>
								<li>임시</li>
								<li onClick={logout}>로그아웃</li>

							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
  );
}

export default Profil;