import React from "react";
import PropTypes from "prop-types";
import "./AdminModal.css";

const AdminModal = ({ isOpen, onClose, selectedMember }) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="Amodal-content">
        <h3>상세정보</h3>
        <p>회원번호: {selectedMember.no}</p>
        <p>이름: {selectedMember.name}</p>
        <p>닉네임: {selectedMember.nickname}</p>
        <p>이메일: {selectedMember.email}</p>
        <p>번호: {selectedMember.createdDate}</p>
        <p>상태: {selectedMember.state}</p>
        <p>권한: {selectedMember.auth}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

AdminModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedMember: PropTypes.object.isRequired,
};

export default AdminModal;
