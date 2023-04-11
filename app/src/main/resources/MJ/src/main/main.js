import React, { useState } from "react";
import axios from 'axios';
import './main.css';
import HModal from "../hmodal/hmodal";

function Main() {

    const [data, setData] = React.useState([]);
    const [selectedNo, setSelectedNo] = useState(null);

    React.useEffect(() => {
    axios.get('http://localhost/web/boards')
    .then((response) => setData(response.data.data))
    .catch((error) => console.error(error));
    }, []);

    const handleListItemClick = (no) => {
        setSelectedNo(no);
    };

    return (
      <div className="main">
          <div className="body">
            <div className="cate">
                <ul className="list">
                    <li className="hot-place">HOT 플레이스</li>
                    <li className="board">커뮤니티</li>
                </ul>
                <ul className="list-best">
                    <li>인기순</li>
                </ul>
            </div>
            <div>
                <ul className="mbox">
                    {data.map((item) => (
                    <li key={item.no} onClick={() => handleListItemClick(item.no)}>
                        <div>
                            <span>번호: {item.no}</span>
                            <span>작성자: {item.writer.name}</span>
                            <span>작성일: {item.createdDate}</span>
                            <span>조회수: {item.viewCount}</span>
                        </div>
                        <div>
                            {item.title ? item.title : '제목없음'}
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
        <HModal isOpen={selectedNo !== null} onClose={() => setSelectedNo(null)} isNo={selectedNo} />
      </div>
    );
}

export default Main;