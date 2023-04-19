import React from 'react';
import './hmodal.css';

function Modal(props) {
  const { isOpen, onClose, children } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="hmodal-background" onClick={e => {
      // 모달 내부를 클릭한 경우에는 모달이 닫히지 않도록 합니다.
      if (e.target.closest('.hmodal') !== null) {
        return;
      }
      onClose();
    }}>
      <div className="hmodal-overlay">
        <div className="hmodal">
          <div className="hmodal-content">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;