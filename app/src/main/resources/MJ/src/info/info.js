import React, { useState, useEffect } from "react";
import axios from "axios";
import "./info.css";

axios.defaults.withCredentials = true;

function Info() {
  const [data, setData] = useState(null);
  const [isNo, setIsNo] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost/web/auth/user")
      .then((response) => {
        if (response.data.status === "success") {
          setData(response.data.data);
          setIsNo(response.data.data.no);
        }
      })
      .catch((error) => {
        alert("로그인 사용자 정보 조회 중 오류 발생!");
        console.log(error);
      });
  }, []);

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

                console.log(data);
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
        <div className="member-file"></div>
        <div className="member-form">
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
                  <td>
                    <input
                      id="f-password"
                      type="password"
                      name="password"
                      value={data.password}
                    />
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
                  <td>
                    <input
                      id="f-nickname"
                      type="text"
                      name="nickname"
                      value={data.nickname}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                
                <tr>
                  <th>전화</th>
                  <td>
                    <input
                      id="f-tel"
                      type="tel"
                      name="tel"
                      value={data.tel}
                      onChange={handleInputChange}
                    />
                  </td>
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
                <button id="btn-cancel2" type="reset" className="edit">취소</button>
              </div>
        </form>
      )}
    </div>
  </div>
</div>

);
}

export default Info;