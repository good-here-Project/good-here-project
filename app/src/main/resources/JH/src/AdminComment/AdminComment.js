import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import AdminCommentModal from "./AdminCommentModal";
import AdminAlertModal from "../AdminAlertModal/AdminAlertModal";
import "./AdminComment.css";

function AdminComment() {
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComment, setSelectedComment] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auth, setAuth] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  const handleCloseModal = () => {
    setSelectedComment({});
    setIsModalOpen(false);
  };
  const getAllComments = function () {
    axios
      .get("http://localhost/web/replys/adminlist", {
        withCredentials: true,
      })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          console.log(response.data);
          console.log(response.data.data);
          setComments(response.data.data);
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
          getAllComments();
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

  const filteredComments = comments.filter((comment) => {
    return (
      comment.writer.nickname
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleGoToBoard = (boardNo) => {
    window.location.href = `/view/${boardNo}`; // 해당 게시물로 이동 (URL 변경)
  };

  return (
    <div className="adminComment">
      <div className="adminComment-header">
        <Sidebar />
        <h2>댓글 관리</h2>
        <input
          id="searchcomment"
          type="text"
          placeholder="댓글 검색"
          value={searchTerm}
          onChange={handleSearchChange}
          className="adminComment-input"
        />
      </div>
      <table className="adminComment-table">
        <thead>
          <tr>
            <th>댓글 번호</th>
            <th>게시물 번호</th>
            <th>내용</th>
            <th>작성자</th>
            <th>상태</th>
            <th>게시일</th>
            <th>상세보기</th>
          </tr>
        </thead>
        <tbody>
          {showAlert && (
            <AdminAlertModal isOpen={showAlert} onClose={handleCloseModal} />
          )}
          {currentComments.map((comment) => (
            <tr key={comment.no}>
              <td>{comment.no}</td>
              <td>{comment.boardNo}</td>
              <td>{comment.content}</td>
              <td>{comment.writer.nickname}</td>
              <td>
                {comment.writer.state === 0
                  ? "활성화"
                  : comment.writer.state === 1
                  ? "블랙리스트"
                  : "알 수 없음"}
              </td>
              <td>{comment.createdDate}</td>
              <td>
                <button onClick={() => handleGoToBoard(comment.boardNo)}>
                  해당 게시물로 이동
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(filteredComments.length / commentsPerPage),
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
        <AdminCommentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedComment={selectedComment}
        />
      )}
    </div>
  );
}

export default AdminComment;
