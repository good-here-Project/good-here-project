import React, { useState, useEffect } from "react";
import axios from "axios";
import "./comu.css";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

function Comu() {

  const [data, setData] = useState([]);
  const [selectedNo, setSelectedNo] = useState(null);
  const [selectedUserNo, setSelectedUserNo] = useState(null);
  const [boardNo, setBoardNo] = useState(null);

  const [photo, setPhoto] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [myBoardCnt, setMyBoardCnt] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost/web/auth/user")
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        if (result.status === "success") {

            let file = result.data.photo;
            let filepath = file.split("/");
            let filename = filepath[3];

          setNickname(result.data.nickname);
          setPhoto(filename);
          setSelectedUserNo(result.data.no);
        } else {

        }
      })
      .catch((error) => {
      });
  }, []);

  React.useEffect(() => {
    axios
      .get("http://localhost/web/boards")
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
        let myBoardCount = 0;
        response.data.data.forEach(item => {
          setBoardNo(item.no);
          
          if (item.boardTypeId !== 0 && item.writer.no === selectedUserNo) {
            myBoardCount++;
          }
        });

        setMyBoardCnt(myBoardCount);
  
      })
      .catch((error) => console.error(error));
  }, [selectedUserNo]);

  console.log(myBoardCnt);


  const viewClick = function(no) {
    window.location.href=`http://localhost:3000/view/${no}`;
  }
  
  return (
    <div className="list-main">
      
      <div className="list-header">
        <div className="list-member-file">
            <img src={`http://xqhwurtrwszc16694936.cdn.ntruss.com/${photo}?type=f&w=300&h=300&ttype=jpg`}></img>
        </div>
        <div className="list-member-info">
            <div className="list-member-info-nickname">{nickname}</div>
            <div className="list-member-board">
                <span className="list-member-board-list">내 게시물 : {myBoardCnt}</span>
                <span className="list-member-board-like">좋아요</span>
            </div>
        </div>
      </div>

      <div className="list-body">
        <div className="cate">
          <ul className="list">
            
            <Link to="/Hotplace" style={{ textDecoration: "none" }}>
                <li className="hot-place" >
                HOT 플레이스
                </li>
            </Link>
            <Link to="/Comu" style={{ textDecoration: "none" }}>
                <li className="board" >
                커뮤니티
                </li>
            </Link>
          </ul>
        </div>
        <div className="list-board-comu-form">
          <ul className="list-board-coum-list">
          <div className="list-board-comu-header">
            <span>번호</span>
            <span>제목</span>
            <span>작성자</span>
            <span>작성일</span>
            <span>조회수</span>
          </div>
          {data
          .filter((item) => item.boardTypeId !== 0 && item.writer.no === selectedUserNo)
          .map((item) =>  {      

            return (
              <li key={item.no}>
              <div className="list-board-coum">

                <div className="list-board-coum-footer">
                  <table border={1}>
                    <td width={40}>{item.no}</td>
                    <td width={300} onClick={() => viewClick(item.no)} className="board-title-name">{item.title ? item.title : "제목없음"}</td>
                    <td width={90}>{item.writer.nickname}</td>
                    <td width={110}>{item.createdDate}</td>
                    <td width={50}>{item.viewCount}</td>
                  </table>
                </div>
              </div>
              </li>
            );
            
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Comu;
