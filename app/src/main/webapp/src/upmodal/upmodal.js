import React, { useState } from 'react';
import './upmodal.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

function UPModal(props) {
  const { isOpen, onClose, children } = props;

  if (!isOpen) {
    return null;
  }

	function insert() {
		const form = document.querySelector('.upmodal-text');
  	const formData = new FormData(form);

		formData.append('boardTypeId', '0');
  
		axios.post("http://localhost/web/boards", formData)
		.then(response => {
			// console.log(response);
			return response;
		})
		.then(result => {
			// console.log(result);
			if (result.status == '200') {
				window.location.href='./';
			} else if (result.errorCode == '401') {
				// location.href = '../auth/form.html';
			} else {
				alert('입력 실패!');
			}
		})
		.catch(exception => {
			alert("입력 오류!");
			console.log(exception);
		});
  
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
						<form className='upmodal-text' method='post' enctype="multipart/form-data">
							<div className='upmodal-text-title'>
								<p>Title</p>
								<input type='text' className='text-title' placeholder='Input Title' name='title'></input>
							</div>
							<div className='upmodal-text-message'>
								<p>Message</p>
								<textarea type='content' className='text-message' placeholder='Input your Message' name='content'></textarea>
								<input type="file" name='files' multiple className='input-file'></input>
							</div>
							<button className='upmodal-text-cancel-btn' onClick={onClose}>Cancel</button>
							<button type='button' className='upmodal-text-create-btn' onClick={insert}>Create</button>
						</form>
					</div>
        </div>
      </div>
    </div>
  );
}

export default UPModal;