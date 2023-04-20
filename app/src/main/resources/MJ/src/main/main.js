import React, { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";
import HModal from "../hmodal/hmodal";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function Main() {
  const [data, setData] = React.useState([]);
  const [selectedNo, setSelectedNo] = useState(null);
  const [selectedUserNo, setSelectedUserNo] = useState(null);
  const navigate = useNavigate();

  const [image, setImage] = useState('img/heart.png');
  const [prevImage, setPrevImage] = useState('');

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
        } else {

        }
      })
      .catch((error) => {
      });
  }, []);

  function handleClick() {
    if (image === 'img/heart.png') {
  
      setPrevImage('img/heart.png');
      setImage('img/colorheart.png');
  
    } else {
      setImage(prevImage);
      setPrevImage('');
    }
  }

  React.useEffect(() => {
    axios
      .get("http://localhost/web/boards")
      .then((response) => setData(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  const handleBoardList = () => {
    navigate("/Board");
  };

  return (
    <div className="main">
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
          .map((item) => (
            <li key={item.no}>
              <div className="mbox-div">
                <div className="mbox-div-img" onClick={() => setSelectedNo(item.no)}>
                  <img src="http://qocrfenoqdxa16854260.cdn.ntruss.com/thumbnail/vod-category/b3aedee9-345e-45c8-a32f-887c718077c6-airplane-129744_01.jpg?type=f&w=240&h=250&ttype=jpg"></img>
                </div>
                <div className="mbox-footer">
                  <div className="mbox-title">{item.title ? item.title : "제목없음"}</div>
                  <div className="mbox-heart">
                    <img src={image} className="heart" onClick={() => handleClick(item.no)}></img>
                  </div>
                </div>
              </div>
            </li>
          ))}
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
