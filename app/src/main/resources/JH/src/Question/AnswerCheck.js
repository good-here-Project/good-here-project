import React from "react";

function AnswerCheck({ selectedAnswer, onClose }) {
  return (
    <div className="Amodal open">
      <div className="Amodal-content">
        <h3>답변 상세 정보</h3>
        <div>
          <p>
            <strong>내용:</strong> {selectedAnswer.content}
          </p>
          <p>
            <strong>작성자:</strong> {selectedAnswer.writer.nickname}
          </p>
          <p>
            <strong>작성일:</strong> {selectedAnswer.createdDate}
          </p>
          {/* 추가적인 정보가 있다면 여기에 표시 */}
        </div>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default AnswerCheck;
