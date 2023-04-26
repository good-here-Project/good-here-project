import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "./AdminMember.css";
import AdminMemberModal from "./AdminMemberModal"; // Modal 컴포넌트 import
import "./AdminMember.css";
import Sidebar from '../Sidebar/Sidebar';



function AdminMember() {
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMember, setSelectedMember] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleMemberDetails = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setSelectedMember({});
        setIsModalOpen(false);
    }

    const getAllMembers = function () {
        axios.get("http://localhost/web/members")
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
        getAllMembers();
    }, []);

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
                {/* 테이블의 바디 */}
                <tbody>
                    {filteredMembers.map((member) => (
                        <tr key={member.no}>
                            <td>{member.no}</td>
                            <td>{member.name}</td>
                            <td>{member.nickname}</td>
                            <td>{member.email}</td>
                            <td>{member.tel}</td>
                            <td>{member.createdDate}</td>
                            <td>{member.state}</td>
                            <td>{member.auth}</td>
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