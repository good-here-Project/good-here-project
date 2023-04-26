import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./info.css";

axios.defaults.withCredentials = true;

function Info() {
  const [data, setData] = useState(null);
  const [isNo, setIsNo] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost/web/auth/user")
      .then((response) => {
        if (response.data.status === "success") {
          setData(response.data.data);
          setIsNo(response.data.data.no);
          // console.log(response.data.data.photo);
          if (response.data.data.photo) {
            let file = response.data.data.photo;
            let filepath = file.split("/");
            let filename = filepath[3];
            console.log(filename);
            setPhoto(filename);
          }
        }
      })
      .catch((error) => {
        alert("로그인 사용자 정보 조회 중 오류 발생!");
        console.log(error);
      });
  }, []);

  //----------------------------------닉네임체크--------------------------------------------
  function checkNickname() {
    const nickname = document.querySelector('#f-nickname').value;

    fetch("http://localhost/web/members/nickCheck?nickname=" + nickname, {
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

  //----------------------------------비밀번호체크--------------------------------------------
  function checkPW() {
    var pw = document.getElementsByName("password")[0].value;
    var num = pw.search(/[0-9]/g);
    var eng = pw.search(/[a-z]/ig);
    var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 6 || pw.length > 18) {
      alert("6자리 ~ 18자리 이내로 입력해주세요.");
      document.getElementById('f-password').value = '';
      return false;
    } else if (pw.search(/\s/) != -1) {
      alert("비밀번호는 공백 없이 입력해주세요.");
      document.getElementById('f-password').value = '';
      return false;
    } else if (num < 0 || eng < 0 || spe < 0) {
      alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
      document.getElementById('f-password').value = '';
      return false;
    } else {
      document.querySelector('.password_ok').style.display = 'inline-block';
      console.log("비밀번호 형식이 맞습니다.");
      return true;
    }
  }

  function updateBtn() {
    const formData = new FormData(document.querySelector("#member-form"));

    axios
      .put("http://localhost/web/members/" + isNo, formData)
      .then((response) => {
        if (response.data.status === "success") {
          // 업데이트된 정보를 다시 받아옴
          axios
            .get("http://localhost/web/auth/user")
            .then((response) => {
              if (response.data.status === "success") {
                setData(response.data.data);

                window.location.reload();
              }
            })
            .catch((error) => {
              alert("로그인 사용자 정보 조회 중 오류 발생!");
              console.log(error);
            });
        } else {
          alert("변경 실패!");
        }
      })
      .catch((error) => {
        alert("변경 중 오류 발생!");
        console.log(error);
      });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }


  return (
    <div className="main">
      <div className="info-body">
        <div className="member-file">
          <img src={`http://xqhwurtrwszc16694936.cdn.ntruss.com/${photo}?type=f&w=300&h=300&ttype=jpg`}></img>
        </div>
        <div className="member-profil-form">
          {data && (
            <form
              id="member-form"
              action="update"
              method="put"
              enctype="multipart/form-data"
            >
              <table border="1" className="member-table">
                <tr>
                  <th>이메일</th>
                  <td>
                    <input
                      id="f-email"
                      type="email"
                      name="email"
                      value={data.email}
                    />
                  </td>
                </tr>

                <tr>
                  <th>암호</th>
                  <td><input id="f-password" type="password" name="password" className="password" placeholder="특수문자, 영문, 숫자 포함 6~18자리" onBlur={checkPW} value={data.password} onChange={handleInputChange}  />
                  <span className="password_ok">사용 가능한 비밀번호입니다.</span>
                  </td>
                </tr>

                <tr>
                  <th>이름</th>
                  <td>
                    <input
                      id="f-name"
                      type="text"
                      name="name"
                      value={data.name}
                    />
                  </td>
                </tr>
                <tr>
                  <th>닉네임</th>
                  <td><input id="f-nickname" type="nickname" name="nickname" className="nickname" placeholder="닉네임을 입력해주세요." onBlur={checkNickname} value={data.nickname}
                      onChange={handleInputChange} />
                  <span className="nickname_ok">사용 가능한 닉네임입니다.</span>
                  <span className="nickname_already">누군가 이 닉네임을 사용하고 있어요.</span>
                  </td>

                </tr>
                
                <tr>
                  <th>전화</th>
                  <td><input type="tel" name="tel" className="tel" maxLength="13" placeholder="휴대폰번호를 입력해주세요." onChange={handleInputChange} value={data.tel} /></td>
                </tr>
                <tr className="edit">
                  <th>등록일</th>
                  <td>
                    <span id="f-createdDate">{data.createdDate}</span>
                  </td>
                </tr>

                <tr>
                  <th>사진</th>
                  <td>
                    <a id="f-photo-origin">
                      <img id="f-photo" className="edit" />
                    </a>
                    <input id="f-file" type="file" name="file" />
                  </td>
                </tr>
                
              </table>

              <div>
                <button id="btn-update2" type="button" className="edit" onClick={updateBtn}>변경</button>
                <Link to="/Main" style={{ textDecoration: "none" }}>
                  <button id="btn-cancel2" type="reset" className="edit">취소</button>
                </Link>
              </div>
        </form>
      )}
    </div>
  </div>
</div>

);
}

export default Info;