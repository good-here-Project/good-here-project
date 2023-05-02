import React from "react";
import PropTypes from "prop-types";
import "./AdminMemberModal.css";
import AdminMemberPermission from "./AdminMemberPermission";
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
      <h2>회원 정보</h2>
        <div>
          <label>회원번호:</label>
          <span>{selectedMember.no}</span>
        </div>
        <div>
          <label>이름:</label>
          <span>{selectedMember.name}</span>
        </div>
        <div>
          <label>닉네임:</label>
          <span>{selectedMember.nickname}</span>
        </div>
        <div>
          <label>이메일:</label>
          <span>{selectedMember.email}</span>
        </div>
        <div>
          <label>전화번호:</label>
          <span>{selectedMember.tel}</span>
        </div>
        <div>
          <label>가입일:</label>
          <span>{selectedMember.createdDate}</span>
        </div>
        <div className="Amodal-actions">
          <AdminMemberPermission
            member={selectedMember}
            onUpdate={handleUpdateMember}
          />
          <AdminMemberBlacklist
            member={selectedMember}
            onUpdate={handleUpdateMember}
          />
        </div>
        <button className="Amodal-close" onClick={handleCloseModal}>
          닫기
        </button>
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
