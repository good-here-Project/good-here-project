import React from "react";
import PropTypes from "prop-types";
import "./AdminMemberModal.css";
import AdminMemberUpdate from "./AdminMemberUpdate";
import AdminMemberBlacklist from "./AdminMemberBlacklist";

const AdminMemberModal = ({ isOpen, onClose, selectedMember }) => {
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
          <AdminMemberUpdate
            member={selectedMember}
            onUpdate={handleUpdateMember}
            onClose={handleCloseModal}
            key={selectedMember.no}
          />
          <AdminMemberBlacklist
            member={selectedMember}
            onUpdate={handleUpdateMember}
          />
        </div>
      </div>
    </div>
  );
};

AdminMemberModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedMember: PropTypes.object.isRequired,
};

export default AdminMemberModal;
