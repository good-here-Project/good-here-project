import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AdminMember.css";
import AdminMemberModal from "./AdminMemberModal"; // Modal 컴포넌트 import
import AdminAlertModal from "../AdminAlertModal/AdminAlertModal";
import Sidebar from "../Sidebar/Sidebar";

function AdminMember() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auth, setAuth] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;

  const handleMemberDetails = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMember({});
    setIsModalOpen(false);
  };

  const getAllMembers = function () {
    axios
      .get("http://localhost/web/members")
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        if (Array.isArray(result.data)) {
          setMembers(result.data);
          console.log(result.data);
        } else {
          console.log("데이터가 배열이 아닙니다.");
        }
      })
      .catch((exception) => {
        alert("회원 정보를 가져오는 중 오류 발생!");
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
          getAllMembers();
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

  const filteredMembers = members.filter((member) => {
    return (
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="adminMember">
      <div className="adminMember-header">
        <Sidebar />
        <h2>회원 관리</h2>
        <input
          id="searchMember"
          type="text"
          placeholder="회원 검색"
          value={searchTerm}
          onChange={handleSearchChange}
          className="adminMember-input"
        />
      </div>
      <table className="adminMember-table">
        {/* 테이블의 헤더 */}
        <thead>
          <tr>
            <th>회원번호</th>
            <th>이름</th>
            <th>NickName</th>
            <th>Email</th>
            <th>전화번호</th>
            <th>가입일</th>
            <th>상태</th>
            <th>권한</th>
            <th>상세정보</th>
          </tr>
        </thead>
        <tbody>
          {showAlert && (
            <AdminAlertModal isOpen={showAlert} onClose={handleCloseModal} />
          )}
          {currentMembers.map((member) => (
            <tr key={member.no}>
              <td>{member.no}</td>
              <td>{member.name}</td>
              <td>{member.nickname}</td>
              <td>{member.email}</td>
              <td>{member.tel}</td>
              <td>{member.createdDate}</td>
              <td>
                {member.state === 0
                  ? "활성화"
                  : member.state === 1
                  ? "블랙리스트"
                  : "알 수 없음"}
              </td>
              <td>
                {member.auth === 1
                  ? "회원"
                  : member.auth === 2
                  ? "관리자"
                  : "회원"}
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleMemberDetails(member)}
                  className="adminMember-detailsBtn"
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
          length: Math.ceil(filteredMembers.length / membersPerPage),
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
        <AdminMemberModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedMember={selectedMember}
        />
      )}
    </div>
  );
}

export default AdminMember;
