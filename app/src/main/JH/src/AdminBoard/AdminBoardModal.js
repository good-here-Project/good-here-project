import React from "react";
import PropTypes from "prop-types";
//import "./AdminBoardModal.css";
import AdminBoardUpdate from "./AdminBoardUpdate";
import AdminBoardDelete from "./AdminBoardDelete";

const AdminBoardModal = ({ isOpen, onClose, selectedBoard, onDelete }) => {
  const handleUpdateBoard = (updatedBoard) => {
    console.log("Updated board:", updatedBoard);
    onClose();
  };

  const handleDeleteBoard = () => {
    onDelete && onDelete(selectedBoard);
    onClose();
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleGoToBoard = () => {
    const boardId = selectedBoard.no; // 게시물의 고유 ID를 가져옴
    window.location.href = `/view/${boardId}`; // 해당 게시물로 이동 (URL 변경)
  };

  return (
    <div className={`Amodal ${isOpen ? "open" : ""}`}>
      <div className="Amodal-content">
        <button onClick={handleGoToBoard}>해당 게시물로 이동</button>

        <div className="Amodal-actions">
          <AdminBoardUpdate
            board={selectedBoard}
            onUpdate={handleUpdateBoard}
            key={selectedBoard.no}
          />
          <AdminBoardDelete
            board={selectedBoard}
            onDelete={handleDeleteBoard}
          />
        </div>
        <button className="Amodal-close" onClick={handleCloseModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

AdminBoardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedBoard: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
};

export default AdminBoardModal;
