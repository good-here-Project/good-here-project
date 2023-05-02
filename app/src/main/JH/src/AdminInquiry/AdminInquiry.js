import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import AdminAlertModal from "../AdminAlertModal/AdminAlertModal";
import AdminInquiryModal from "./AdminInquiryModal";
import "./AdminInquiry.css";

function Inquiry() {
  const [inquirys, setInquirys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auth, setAuth] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const inquirysPerPage = 10;

  const handleInquiryDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedInquiry({});
    setIsModalOpen(false);
  };

  const getAllInquirys = function () {
    axios
      .get("http://localhost/web/questions")
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        if (Array.isArray(result.data)) {
          setInquirys(result.data);
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
          getAllInquirys();
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

  const filteredinquirys = inquirys.filter((inquiry) => {
    return (
      inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  //Pagination;
  const indexOfLastInquiry = currentPage * inquirysPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquirysPerPage;
  const currentInquirys = filteredinquirys.slice(
    indexOfFirstInquiry,
    indexOfLastInquiry
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="adminInquiry">
      <div className="adminInquiry-header">
        <Sidebar />
        <h2>QnA 관리</h2>
        <input
          id="searchinquiry"
          type="text"
          placeholder="게시물 검색"
          value={searchTerm}
          onChange={handleSearchChange}
          className="adminInquiry-input"
        />
      </div>
      <table className="adminInquiry-table">
        <thead>
          <tr>
            <th>문의 글 번호</th>
            <th>제목</th>
            {/* <th>내용</th> */}
            <th>작성자</th>
            <th>작성일</th>
            <th>상세보기</th>
            <th>답변 여부</th>
          </tr>
        </thead>
        <tbody>
          {showAlert && (
            <AdminAlertModal isOpen={showAlert} onClose={handleCloseModal} />
          )}
          {currentInquirys.map((inquiry) => (
            <tr key={inquiry.no}>
              <td>{inquiry.no}</td>
              <td>{inquiry.title}</td>
              {/* <td>{inquiry.content}</td> */}
              <td>{inquiry.writer.nickname}</td>
              <td>{inquiry.createdDate}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleInquiryDetails(inquiry)}
                  className="adminInquiry-detailsBtn"
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
          length: Math.ceil(filteredinquirys.length / inquirysPerPage),
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
      {isModalOpen && (
        <AdminInquiryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedInquiry={selectedInquiry}
          loginUser={auth}
        />
      )}
    </div>
  );
}

export default Inquiry;
