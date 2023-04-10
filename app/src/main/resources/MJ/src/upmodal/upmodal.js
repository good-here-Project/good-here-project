import React from 'react';
import './upmodal.css';

function UPModal(props) {
  const { isOpen, onClose, children } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="upmodal-background" onClick={e => {
      // 모달 내부를 클릭한 경우에는 모달이 닫히지 않도록 합니다.
      if (e.target.closest('.upmodal') !== null) {
        return;
      }
      onClose();
    }}>
      <div className="upmodal-overlay">
        <div className="upmodal">
          <div className="upmodal-content">
						<div className='upmodal-file'>
							<div className='upmodal-file-text'>Upload HOT 플레이스</div>
							<div className='upmodal-file-upload'>
								<div>
									<img src='img/hotplace.png'></img>
								</div>
								<div>
								
								</div>
							</div>
						</div>
						<div className='upmodal-text'>
							<div className='upmodal-text-title'>
								<p>Title</p>
								<input type='text' className='text-title' placeholder='Input Title'></input>
							</div>
							<div className='upmodal-text-message'>
								<p>Message</p>
								<input type='text' className='text-message' placeholder='Input your Message'></input>
							</div>
							<button className='upmodal-text-cancel-btn' onClick={onClose}>Cancel</button>
							<button className='upmodal-text-create-btn'>Create</button>
						</div>
					</div>
        </div>
      </div>
    </div>
  );
}

export default UPModal;