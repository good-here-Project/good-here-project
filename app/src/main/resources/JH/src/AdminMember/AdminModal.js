import React from "react";
import PropTypes from "prop-types";
import "./AdminModal.css";
import AdminUpdate from "./AdminUpdate";
import AdminDelete from "./AdminDelete";

const AdminModal = ({ isOpen, onClose, selectedMember, onDelete }) => {
  const handleUpdateMember = (updatedMember) => {
    console.log("Updated member:", updatedMember);
    onClose();
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div className={`Amodal ${isOpen ? "open" : ""}`}>
      <div className="Amodal-content">
        <div className="Amodal-actions">
          <AdminUpdate member={selectedMember}
            onUpdate={handleUpdateMember}
            onClose={handleCloseModal}
            key={selectedMember.no}
          />
          <AdminDelete member={selectedMember} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
};

AdminModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedMember: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AdminModal;
