import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Sidebar from '../Sidebar/Sidebar';
import AdminBoardModal from "./AdminBoardModal";
//import "./AdminBoard.css";

function AdminBoard() {
    const [boards, setBoards] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBoard, setSelectedBoard] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBoardDetails = (board) => {
        setSelectedBoard(board);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setSelectedBoard({});
        setIsModalOpen(false);
    }

    const getAllBoards = function () {
        axios.get("http://localhost/web/boards")
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
        getAllBoards();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredboards = boards.filter((board) => {
        return (
            board.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            board.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

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
                        <th>게시판 유형 번호</th>
                        <th>게시글명</th>
                        <th>게시글 내용</th>
                        <th>게시일</th>
                        <th>조회수</th>
                        <th>상세정보</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredboards.map((board) => (
                        <tr key={board.no}>
                            <td>{board.no}</td>
                            <td>{board.boardTypeId}</td>
                            <td>{board.title}</td>
                            <td>{board.content}</td>
                            <td>{board.createdDate}</td>
                            <td>{board.viewCount}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => handleBoardDetails(board)}
                                    className="adminBoard-detailsBtn">
                                    상세정보
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal 컴포넌트 */}
            {isModalOpen && (
                <AdminBoardModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    selectedBoard={selectedBoard}
                />
            )}
        </div>
    );
}

export default AdminBoard;
