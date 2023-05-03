import React from "react";

function InquiryDetails({ inquiry, onClose }) {
  return (
    <div className="Amodal open">
      <div className="Amodal-content">
        <h3>질문 상세 정보</h3>
        <div>
          <p>
            <strong>제목:</strong> {inquiry.title}
          </p>
          <p>
            <strong>내용:</strong> {inquiry.content}
          </p>
          <p>
            <strong>작성자:</strong> {inquiry.writer.nickname}
          </p>
          <p>
            <strong>작성일:</strong> {inquiry.createdDate}
          </p>
          {/* 추가적인 정보가 있다면 여기에 표시 */}
        </div>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default InquiryDetails;
