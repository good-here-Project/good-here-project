import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
//import "./AdminBoardModal.css";

const AdminBoardUpdate = ({ board, onUpdate, onClose }) => {
    const [updatedBoard, setUpdatedBoard] = useState(null);

    useEffect(() => {
        setUpdatedBoard(board);
    }, [board]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBoard((prevBoard) => ({
            ...prevBoard,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost/web/boards/${board.no}`, updatedBoard);
            onUpdate(response.data);
            alert('변경이 완료되었습니다.');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    if (!updatedBoard) {
        return null;
    }

    return (
        <div className="AdminBoardUpdate">
            <form onSubmit={handleSubmit}>
                <h3>게시물 정보</h3>
                <div className="form-group">
                    <label htmlFor="no">게시물 번호:</label>
                    <span id="no">{updatedBoard?.no}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="title">제 목:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={updatedBoard?.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">내 용:</label>
                    <input
                        type="text"
                        name="content"
                        id="content"
                        value={updatedBoard?.content}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="createdDate">가입일:</label>
                    <span id="createdDate">{updatedBoard?.createdDate}</span>
                </div>
                <div className="form-buttons">
                    <button type="submit">수정</button>
                    <button type="button" onClick={onClose}>
                        닫기
                    </button>
                </div>
            </form>
        </div>
    );
};

AdminBoardUpdate.propTypes = {
    board: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AdminBoardUpdate;
