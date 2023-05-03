import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import AdminBoardModal from "./AdminBoardModal";
import AdminAlertModal from "../AdminAlertModal/AdminAlertModal";
import "./AdminBoard.css";

function AdminBoard() {
  const [boards, setBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBoard, setSelectedBoard] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auth, setAuth] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const boardsPerPage = 10;

  const handleBoardDetails = (board) => {
    setSelectedBoard(board);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBoard({});
    setIsModalOpen(false);
  };

  const getAllBoards = function () {
    axios
      .get("http://localhost/web/boards")
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        if (Array.isArray(result.data)) {
          setBoards(result.data);
          console.log(result.data);
        } else {
          console.log("데이터가 배열이 아닙니다.");
        }
      })
      .catch((exception) => {
        alert("게시물 정보를 가져오는 중 오류 발생!");
        console.log(exception);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost/web/auth/user");
        const user = response.data;
        setAuth(user.data.auth);

        if (user.data.auth === 2) {
          getAllBoards();
        } else {
          setShowAlert(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [auth, showAlert]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredboards = boards.filter((board) => {
    return (
      board.writer.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      board.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      board.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination
  const indexOfLastBoard = currentPage * boardsPerPage;
  const indexOfFirstBoard = indexOfLastBoard - boardsPerPage;
  const currentBoards = filteredboards.slice(
    indexOfFirstBoard,
    indexOfLastBoard
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="adminBoard">
      <div className="adminBoard-header">
        <Sidebar />
        <h2>게시물 관리</h2>
        <input
          id="searchboard"
          type="text"
          placeholder="게시물 검색"
          value={searchTerm}
          onChange={handleSearchChange}
          className="adminBoard-input"
        />
      </div>
      <table className="adminBoard-table">
        <thead>
          <tr>
            <th>게시물 번호</th>
            <th>게시판 유형</th>
            <th>게시글명</th>
            <th>작성자</th>
            <th>게시일</th>
            <th>조회수</th>
            <th>상세정보</th>
          </tr>
        </thead>
        <tbody>
          {showAlert && (
            <AdminAlertModal isOpen={showAlert} onClose={handleCloseModal} />
          )}
          {currentBoards.map((board) => (
            <tr key={board.no}>
              <td>{board.no}</td>
              <td>
                {board.boardTypeId === 0 && "핫플게시판"}
                {board.boardTypeId === 1 && "자유게시판"}
                {board.boardTypeId === 2 && "QnA"}
                {board.boardTypeId === 3 && "맛집&이색카페"}
                {board.boardTypeId === 4 && "여행정보"}
                {board.boardTypeId === 5 && "여행동행"}
              </td>
              <td>{board.title}</td>
              <td>{board.writer.nickname}</td>
              <td>{board.createdDate}</td>
              <td>{board.viewCount}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleBoardDetails(board)}
                  className="adminBoard-detailsBtn"
                >
                  상세정보
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(filteredboards.length / boardsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            className={`pagination-btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {/* Modal 컴포넌트 */}
      {isModalOpen && (
        <AdminBoardModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedBoard={selectedBoard}
          loginUser={auth}
        />
      )}
    </div>
  );
}

export default AdminBoard;
