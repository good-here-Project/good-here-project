// AdminInquiryModal.js

import React from "react";
import PropTypes from "prop-types";
import AdminInquiryInsert from "./AdminInquiryInsert";

const AdminInquiryModal = ({
  isOpen,
  onClose,
  selectedInquiry,
  selectedAnswer,
  onInsertAnswer,
}) => {
  const handleCloseModal = () => {
    onClose();
  };

  console.log("Selected answer:", selectedAnswer); // 로그로 selectedAnswer 값 출력

  return (
    <div className={`Amodal ${isOpen ? "open" : ""}`}>
      <div className="Amodal-content">
        <div className="Amodal-details">
          <h3>{selectedInquiry.writer.nickname}의 질문</h3>
          <p>제목: {selectedInquiry.title}</p>
          <p>내용: {selectedInquiry.content}</p>
          {/* Display answer data if available */}
          {selectedAnswer.content != null ? (
            <div>
              <h4>답변</h4>
              <p>{selectedAnswer.content}</p>
            </div>
          ) : (
            <div className="Amodal-answer">
              <AdminInquiryInsert
                selectedInquiry={selectedInquiry}
                onInsert={onInsertAnswer} // 수정: onInsertAnswer prop을 onInsert로 변경
              />
            </div>
          )}
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
  selectedAnswer: PropTypes.array.isRequired,
  onInsertAnswer: PropTypes.func.isRequired,
};

export default AdminInquiryModal;
