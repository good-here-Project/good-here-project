import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AdminBoardUpdate = ({ board, onUpdate, onClose }) => {
  const [updatedBoard, setUpdatedBoard] = useState(null);
  const [file, setFile] = useState(null);

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }

      const { no, boardTypeId, writer, title, content, createdDate } =
        updatedBoard;
      const boardData = {
        no,
        boardTypeId,
        writer,
        title,
        content,
        createdDate,
        files: updatedBoard.files !== null ? updatedBoard.files : [], // "files"가 null인 경우 빈 배열로 대체합니다.
      };
      formData.append("board", JSON.stringify(boardData));

      const response = await axios.put(
        `http://localhost/web/boards/admin/${board.no}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUpdate(response.data);
      alert("변경이 완료되었습니다.");
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
          <label htmlFor="boardtypeid">게시판유형:</label>
          <span id="boardtypeid">
            {" "}
            {updatedBoard?.boardTypeId === 0 && "핫플게시판"}
            {updatedBoard?.boardTypeId === 1 && "자유게시판"}
            {updatedBoard?.boardTypeId === 2 && "QnA"}
            {updatedBoard?.boardTypeId === 3 && "맛집&이색카페"}
            {updatedBoard?.boardTypeId === 4 && "여행정보"}
            {updatedBoard?.boardTypeId === 5 && "여행동행"}
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="nickname">닉네임:</label>
          <span id="nickname">{updatedBoard?.writer.nickname}</span>
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
          <label htmlFor="file">첨부 파일:</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
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
