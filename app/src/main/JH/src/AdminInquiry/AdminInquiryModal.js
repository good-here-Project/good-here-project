import React from "react";
import PropTypes from "prop-types";
import AdminInquiryInsert from "./AdminInquiryInsert";

const AdminInquiryModal = ({ isOpen, onClose, selectedInquiry }) => {
  const handleInsertInquiry = (insertedInquiry) => {
    console.log("Inserted inquiry:", insertedInquiry);
    onClose();
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div className={`Amodal ${isOpen ? "open" : ""}`}>
      <div className="Amodal-content">
        <div className="Amodal-details">
          <h3>{selectedInquiry.writer.nickname}의 질문</h3>
          <p>제목: {selectedInquiry.title}</p>
          <p>내용: {selectedInquiry.content}</p>
          {/* 추가적인 상세 정보 표시 가능 */}
        </div>
        <div className="Amodal-answer">
          <AdminInquiryInsert
            selectedInquiry={selectedInquiry}
            onInsert={handleInsertInquiry}
          />
        </div>
        <button className="Amodal-close" onClick={handleCloseModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

AdminInquiryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedInquiry: PropTypes.object.isRequired,
};

export default AdminInquiryModal;
