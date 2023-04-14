import React, { useState } from "react";
import axios from "axios";
import "./main.css";
import HModal from "../hmodal/hmodal";
import { useNavigate } from "react-router-dom";

function Main() {
  const [data, setData] = React.useState([]);
  const [selectedNo, setSelectedNo] = useState(null);
  const navigate = useNavigate();

  const handleModalClose = () => {
    setSelectedNo(null);
  };

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
            {data.map((item) => (
              <li key={item.no} onClick={() => setSelectedNo(item.no)}>
                <div>
                  <div>번호: {item.no}</div>
                  <div>작성자: {item.writer.name}</div>
                  <div>작성일: {item.createdDate}</div>
                  <div>조회수: {item.viewCount}</div>
                </div>
                <div>{item.title ? item.title : "제목없음"}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedNo !== null && (
        <HModal isOpen={true} onClose={handleModalClose} isNo={selectedNo} />
      )}
    </div>
  );
}

export default Main;
