import React from 'react';
import './hmodal.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

function HModal(props) {
  const { isOpen, onClose, isNo } = props;
  
  console.log(isNo);

  if (!isOpen) {
    return null;
  }

  fetch("http://localhost/web/boards/" + isNo)
  .then(response => {
    return response.json();
  })
  .then(result => {
    if (result.status == 'failure') {
      alert('게시글을 조회할 수 없습니다.');
      // location.href = "list.html";
      return;
    }
    
    let board = result.data;
    //console.log(board);
    document.querySelector("input[name='no']").value = board.no;
    document.querySelector("input[name='title']").value = board.title;
    document.querySelector("textarea[name='content']").value = board.content;
    document.querySelector("#f-writer-name").innerHTML = board.writer.name;
    document.querySelector("#f-created-date").innerHTML = board.createdDate;
    document.querySelector("#f-view-count").innerHTML = board.viewCount;
    
    let ul = "";
    board.attachedFiles.forEach(file => {
      console.log(file);
      if (file.no == 0) return;
      let html = `
        <li id="li-${file.no}">
          <a href="https://kr.object.ncloudstorage.com/bitcamp-bucket28/board/${file.filepath}">${file.originalFilename}</a>
          [<a href="#" onclick="deleteFile(${board.no}, ${file.no}); return false;">삭제</a>] 
        </li>`;
      ul += html;
    });
    document.querySelector("#f-files").innerHTML = ul;
    
    checkOwner(board.writer.no);
  });

  function checkOwner(writerNo) {
    axios.get("http://localhost/web/auth/user")
    .then(response => {
    console.log(response.data);
      if (response.data.status === 'success') {
        if (response.data.data.no === writerNo) {
          document.querySelector('#btn-update').classList.remove('guest');
          document.querySelector('#btn-delete').classList.remove('guest');
        }
      }
    })
    .catch(error => {
    alert("로그인 사용자 정보 조회 중 오류 발생!");
    console.log(error);
    });
    }

    function updateBtn() {
      const form = document.querySelector('#board-form');
      const formData = new FormData(form);
      
      axios.put("http://localhost/web/boards/" + isNo, formData)
        .then(response => {
        console.log(response.data);
        if (response.data.status === 'success') {
        window.location.href='./';
        } else {
        alert('변경 실패!');
        }
        })
        .catch(error => {
        alert('변경 중 오류 발생!');
        console.log(error);
        });
      }

    function deleteBtn() {
      axios.delete("http://localhost/web/boards/" + isNo)
        .then(response => {
        console.log(response.data);
        if (response.data.status === 'success') {
        window.location.href='./';
        } else {
        alert('삭제 실패!');
        }
        })
        .catch(error => {
        alert('삭제 중 오류 발생!');
        console.log(error);
        });
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
          <div className="hmodal-content">
          <form id='board-form' action='update' method='post' enctype="multipart/form-data">
          <table border='1'>
          <tr>
            <th>번호</th>
            <td><input type='text' name='no' readonly/></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type='text' name='title'/></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea name='content' rows='10' cols='60'></textarea></td>
          </tr>
          <tr>
            <th>작성자</th>
            <td><span id="f-writer-name"></span></td>
          </tr>
          <tr>
            <th>등록일</th>
            <td><span id="f-created-date"></span></td>
          </tr>
          <tr>
            <th>조회수</th>
            <td><span id="f-view-count"></span></td>
          </tr>
          <tr>
            <th>첨부파일</th>
            <td>
              <input type="file" name='files' multiple/>
              <ul id="f-files"></ul>
            </td>
          </tr>
          </table>
          
          <div>
            <button id="btn-update" type="button" class="guest" onClick={updateBtn}>변경</button>
            <button id='btn-delete' type='button' class="guest" onClick={deleteBtn}>삭제</button>
          </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HModal;