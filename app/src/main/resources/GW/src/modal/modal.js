import React from 'react';
import './modal.css';

function Modal(props) {
  const { isOpen, onClose, children } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-background" onClick={e => {
      // 모달 내부를 클릭한 경우에는 모달이 닫히지 않도록 합니다.
      if (e.target.closest('.modal') !== null) {
        return;
      }
      onClose();
    }}>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;