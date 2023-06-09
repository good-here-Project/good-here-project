import React, { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";
import HModal from "../hmodal/hmodal";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../AdminMenu/AdminMenu";

axios.defaults.withCredentials = true;

function Main() {
  const [data, setData] = React.useState([]);
  const [selectedNo, setSelectedNo] = useState(null);
  const [selectedUserNo, setSelectedUserNo] = useState(null);
  const [boardNo, setBoardNo] = useState(null);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);

  const [image, setImage] = useState('img/heart.png');
  const [likeState, setLikeState] = useState(null);

  // axios.get("http://localhost/web/like/" + boardNo)
  // .then(response => {
  //   const result = response.data;

  //   const data = result.data;
  //   // console.log(result);
  //   if (data === 'false') {
  //     // 좋아요를 누르지 않은 상태
  //     setLikeState(false);
  //     // setImage('img/heart.png');
  //   } else if (data === 'true') {
  //     // 이미 좋아요를 누른 상태
  //     setLikeState(true);
  //     // setImage('img/colorheart.png');
  //   }
  //   console.log(likeState);

  // })
  // .catch(exception => {
  //   alert("입력 오류!");
  //   console.log(exception);
  // });

  const handleModalClose = () => {
    setSelectedNo(null);
  };

  useEffect(() => {
    axios
      .get("http://localhost/web/auth/user")
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        if (result.status === "success") {
          // console.log(result.data.no);
          setSelectedUserNo(result.data.no);
          setAuth(result.data.auth); // 로그인 여부 상태 업데이트
        } else {
          setAuth(0);
        }
      })
      .catch((error) => {
      });
  }, []);

  React.useEffect(() => {
    axios
      .get("http://localhost/web/boards/list")
      .then((response) => {
        setData(response.data.data);
        response.data.data.forEach(item => {
          // console.log(item.no);
          setBoardNo(item.no);
        });
        // console.log(response.data.data);
        // {data.map((item) => {
        //   // console.log(item.attachedFiles[0].filepath);
        //   let filename = item.attachedFiles[0].filepath;
        //   let files = filename.split("/");
        //   let file = files[4];
        //   let url = file.split(".");
        //   console.log(url[0]);
        // })}
      })
      .catch((error) => console.error(error));
  }, []);

  const handleBoardList = () => {
    navigate("/Board");
  };


  return (
    <div className="main">
      {auth === 2 && <AdminMenu />}
      <div className="body">
        <div className="cate">
          <ul className="list">
            <li className="hot-place">HOT 플레이스</li>
            <li className="board" onClick={handleBoardList}>
              커뮤니티
            </li>
          </ul>
          <ul className="list-best">
            <li>인기순</li>
          </ul>
        </div>
        <div>
          <ul className="mbox">
            {data
              .filter((item) => item.boardTypeId === 0)
              .map((item) => {

                let file = item.attachedFiles[0].filepath;
                let filename = file.split("board/")[1];
                let filepath = filename.split(".")[0];
                // console.log(filepath);

                return (
                  <li key={item.no}>
                    <div className="mbox-div">
                      <div className="mbox-div-img" onClick={() => setSelectedNo(item.no)}>
                        <img src={`http://qocrfenoqdxa16854260.cdn.ntruss.com/thumbnail/vod-category/${filepath}_01.jpg?type=f&w=240&h=250&ttype=jpg`}></img>
                      </div>
                      <div className="mbox-footer">
                        <div className="mbox-title">{item.title ? item.title : "제목없음"}</div>
                        <div className="mbox-heart">

                        </div>
                      </div>
                    </div>
                  </li>
                );

              })}
          </ul>
        </div>
      </div>
      {selectedNo !== null && (
        <HModal isOpen={true} onClose={handleModalClose} isNo={selectedNo} userNo={selectedUserNo} />
      )}
    </div>
  );
}

export default Main;
