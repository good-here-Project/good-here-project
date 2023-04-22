import React from "react";
import PropTypes from "prop-types";
import "./AdminMemberModal.css";
import AdminMemberUpdate from "./AdminMemberUpdate";
import AdminMemberDelete from "./AdminMemberDelete";

const AdminMemberModal = ({ isOpen, onClose, selectedMember, onDelete }) => {
  const handleUpdateMember = (updatedMember) => {
    console.log("Updated member:", updatedMember);
    onClose();
  };

  const handleDeleteMember = () => {
    onDelete(selectedMember);
    onClose();
  };

  const handleCloseModal = () => {
    onClose();
  };



  return (
    <div className={`Amodal ${isOpen ? "open" : ""}`}>
      <div className="Amodal-content">
        <div className="Amodal-actions">
          <AdminMemberUpdate
            member={selectedMember}
            onUpdate={handleUpdateMember}
            onClose={handleCloseModal}
            key={selectedMember.no}
          />
          <AdminMemberDelete member={selectedMember} onDelete={handleDeleteMember} />
        </div>
      </div>
    </div>
  );
};

AdminMemberModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedMember: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AdminMemberModal;
