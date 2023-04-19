import React, { useState } from "react";
import axios from "axios";
import "./main.css";
import HModal from "../hmodal/hmodal";
import { Link } from "react-router-dom";

function Main() {
  const [data, setData] = React.useState([]);
  const [selectedNo, setSelectedNo] = useState(null);

  const handleModalClose = () => {
    setSelectedNo(null);
  };

  React.useEffect(() => {
    axios
      .get("http://localhost/web/boards")
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="main">
      <div className="body">
        <div className="cate">
          <ul className="list">
            <li className="hot-place">HOT 플레이스</li>
            <Link to="/Board" style={{ textDecoration: "none" }}>
              <li className="board">커뮤니티</li>
            </Link>
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
