import React, { useState, useEffect } from "react";
import axios from "axios";
import "./hotplace.css";
import HModal from "../hmodal/hmodal";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

function Hotplace() {

  const [data, setData] = useState([]);
  const [selectedNo, setSelectedNo] = useState(null);
  const [selectedUserNo, setSelectedUserNo] = useState(null);
  const [boardNo, setBoardNo] = useState(null);

  const [photo, setPhoto] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [myBoardCnt, setMyBoardCnt] = useState(null);


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
      .get("http://localhost/web/boards/list")
      .then((response) => {
        setData(response.data.data);

        let myBoardCount = 0;
        response.data.data.forEach(item => {
          setBoardNo(item.no);
          
          if (item.boardTypeId === 0 && item.writer.no === selectedUserNo) {
            myBoardCount++;
          }
        });

        setMyBoardCnt(myBoardCount);
  
      })
      .catch((error) => console.error(error));
  }, [selectedUserNo]);

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
        <div>
          <ul className="list-mbox">
          {data
          .filter((item) => item.boardTypeId === 0 && item.writer.no === selectedUserNo)
          .map((item) =>  {      
            let file = item.attachedFiles[0].filepath;
            let filename = file.split("board/")[1];
            let filepath = filename.split(".")[0];

            return (
              <li key={item.no}>
              <div className="mbox-div">
                <div className="list-mbox-div-img" onClick={() => setSelectedNo(item.no)}>
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

export default Hotplace;
