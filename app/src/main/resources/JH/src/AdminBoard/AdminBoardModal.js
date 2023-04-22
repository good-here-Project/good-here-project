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

    const handleCloseModal = () => {
        onClose();
    };

    return (
        <div className={`Amodal ${isOpen ? "open" : ""}`}>
            <div className="Amodal-content">
                <div className="Amodal-actions">
                    <AdminBoardUpdate
                        board={selectedBoard}
                        onUpdate={handleUpdateBoard}
                        onClose={handleCloseModal}
                        key={selectedBoard.no}
                    />
                    <AdminBoardDelete board={selectedBoard} onDelete={onDelete} />
                </div>
            </div>
        </div>
    );
};

AdminBoardModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedBoard: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default AdminBoardModal;
