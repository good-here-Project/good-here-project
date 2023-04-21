import React, { useState, useEffect } from "react";
import './hmodal.css';
import axios from 'axios';
import ReactPlayer from 'react-player';

axios.defaults.withCredentials = true;

function HModal(props) {
  const { isOpen, onClose, isNo, userNo } = props;
  const [value, setValue] = useState('');
  
  const [image, setImage] = useState('img/heart.png');
  const [prevImage, setPrevImage] = useState('');

  const [data, setData] = React.useState([]);
  const [url, setUrl] = useState('');

  const [likeCnt, setLikeCnt] = useState();

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault(); // 이벤트의 기본 동작을 막음
      insert();
    }
  };

  // console.log(isNo);
  // console.log(userNo);



  axios.get("http://localhost/web/like/cnt/" + isNo)
    .then(response => {
      const result = response.data;
      setLikeCnt(result);
      // console.log(result);
    })
    .catch(exception => {

    });


  axios.get("http://localhost/web/like/" + isNo)
  .then(response => {
    const result = response.data;

    const data = result.data;
    // console.log(result.data);
    if (data === 'false') {
      // 좋아요를 누르지 않은 상태
      setImage('img/heart.png');
    } else if (data === 'true') {
      // 이미 좋아요를 누른 상태
      setImage('img/colorheart.png');
    }
    // console.log(result);

  })
  .catch(exception => {
    alert("입력 오류!");
    console.log(exception);
  });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function insert() {

    axios
    .post(
      "http://localhost/web/replys",
      {},
      {
        params: {
          boardNo: isNo,
          content: value,
        },
      }
    )
		.then(response => {
			return response;
		})
		.then(result => {
			if (result.status == '200') {
        window.location.reload();
			} else if (result.errorCode == '401') {
			} else {
				alert('입력 실패!');
			}
		})
		.catch(exception => {
			alert("입력 오류!");
			console.log(exception);
		});
  
	}

  React.useEffect(() => {
    axios
      .get(
        "http://localhost/web/replys",
        {},
        {
          params: {
            boardNo: isNo,
          },
        }
      )
      .then((response) => {
        setData(response.data.data);
        const result = response.data;
        // console.log(result);
        // checkOwner2(response.data.data.writerNo);
      })
      .catch((error) => console.error(error));

  }, [isNo]);

  function handleClick() {
    if (image === 'img/heart.png') {
      
      axios
      .post(
        "http://localhost/web/like",
        {},
        {
          params: {
            boardNo: isNo,
            memberNo: userNo,
          },
        }
      )
      .then(response => {
        console.log(response);
        return response;
      })
      .then(result => {
        if (result.status == '200') {
        } else if (result.errorCode == '401') {
        } else {
          alert('입력 실패!');
        }
      })
      .catch(exception => {
        alert("입력 오류!");
        console.log(exception);
      });

      setPrevImage('img/heart.png');
      setImage('img/colorheart.png');
    } else {

      axios
      .post(
        "http://localhost/web/like/delete",
        {},
        {
          params: {
            boardNo: isNo,
            memberNo: userNo,
          },
        }
      )
      .then(response => {
        return response;
      })
      .then(result => {
        if (result.status == '200') {
          console.log(result);
        } else if (result.errorCode == '401') {
        } else {
          alert('입력 실패!');
        }
      })
      .catch(exception => {
        alert("입력 오류!");
        console.log(exception);
      });

      setImage(prevImage);
      setPrevImage('');
    }
  }

  if (!isOpen) {
    return null;
  }

  axios.get(`http://localhost/web/boards/${isNo}`)
  .then(response => {
    const result = response.data;

    if (result.status === 'failure') {
      alert('게시글을 조회할 수 없습니다.');
      return;
    }
    
    const board = result.data;

    document.querySelector("input[name='title']").value = board.title;
    document.querySelector("#f-created-date").innerHTML = board.createdDate;
    document.querySelector("#f-writer-name").innerHTML = board.writer.nickname;
    document.querySelector("textarea[name='content']").value = board.content;

    let ul = "";
    board.attachedFiles.forEach(file => {
      // console.log(file);
      if (file.no == 0) return;
      let html = `
      <li id="li-${file.no}">
        <a href="https://kr.object.ncloudstorage.com/bitcamp-bucket22/board/${file.filepath}">${file.originalFilename}</a>
        [<a href="#" onClick="deleteFile(${board.no}, ${file.no}); return false;">삭제</a>] 
      </li>`;
        setUrl(`${file.filepath}`);
        // console.log(url);
      ul += html;
    });
    // document.querySelector("#f-files").innerHTML = ul;
    checkOwner(board.writer.no);
  })
  .catch(error => console.error(error));

  function checkOwner(writerNo) {
      axios.get("http://localhost/web/auth/user")
      .then(response => {
        // console.log(response.data);
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

    function checkOwner2(writerNo) {
      axios.get("http://localhost/web/auth/user")
      .then(response => {
        // console.log(response.data);
        if (response.data.status === 'success') {
          if (response.data.data.no === writerNo) {
            document.querySelector('#comment-delete').classList.remove('comment-delete');
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
        // console.log(response.data);
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
        if (window.confirm('정말로 삭제하시겠습니까?')) {
          axios.delete("http://localhost/web/boards/" + isNo)
          .then(response => {
            const result = response.data;
            if (result.status === 'success') {
              alert('게시글이 삭제되었습니다.');
              window.location.reload();
            } else {
              alert('게시글 삭제 실패!');
            }
          })
          .catch(error => console.error(error));
        }
      }

      

      function commentDelete(commentNo) {
        axios
          .delete(`http://localhost/web/replys/${commentNo}`)
          .then((response) => {
            console.log(response.data);
            if (response.data.status === "success") {
              window.location.href = "./";
            } else {
              alert("삭제 실패!");
            }
          })
          .catch((error) => {
            alert("삭제 중 오류 발생!");
            console.log(error);
          });
      }

      function formatDate(dateString, format) {
        const date = new Date(dateString);
        const options = {
          hour12: false,
          timeZone: 'Asia/Seoul'
        };
        const parts = new Intl.DateTimeFormat('ko-KR', options).formatToParts(date);
        const year = date.getFullYear();
        const month = padZero(date.getMonth() + 1);
        const day = padZero(date.getDate());
        const hour = padZero(date.getHours());
        const minute = padZero(date.getMinutes());
      
        if (isWithin24Hours(dateString)) {
          // 작성 시간이 현재 시간으로부터 24시간 이내인 경우
          if (new Date().getDate() === date.getDate()) {
            // 작성일이 오늘이라면 시간과 분 포맷을 반환
            return `${hour}:${minute}`;
          } else {
            // 작성일이 오늘이 아니라면 년 월 일 포맷을 반환
            return `${year}-${month}-${day}`;
          }
        } else if (new Date().getDate() === date.getDate() + 1) {
          // 작성일이 오늘이 아니고, 작성일의 다음 날이 오늘이라면
          return `어제`;
        } else {
          // 작성 시간이 현재 시간으로부터 2일 이상인 경우
          return `${year}-${month}-${day}`;
        }
      
        function isWithin24Hours(dateString) {
          const createdDate = new Date(dateString);
          const timeDiff = Date.now() - createdDate.getTime();
          return timeDiff < 24 * 60 * 60 * 1000;
        }
      
        function padZero(num) {
          return String(num).padStart(2, '0');
        }
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
          <form id='board-form' method='post' enctype="multipart/form-data">
            <div className='hmodal-view'>

            <div className='hmodal-view-file'>
            <ReactPlayer
              url={url}
              controls={true}
              width='100%'
              height='100%'
            />
            </div>

              <div className='hmodal-view-text'>
                <div className='hmodal-view-header'>
                  <div>
                    <div>
                      <input type='text' name='title' className='title-text'/>
                    </div>
                    <div>
                      <span className='f-created-date'>From</span>
                      <span id="f-created-date"></span>
                    </div>
                  </div>
                  <div className='heartbox'>
                    <img src={image} className="heart" onClick={handleClick}></img>
                    <div className="likeCntText">{likeCnt}</div>
                  </div>
                </div>

                <div className='hmodal-view-body'>
                  <div className='hmodal-view-body-head'>
                    작성자 : <span id="f-writer-name"></span>
                  </div>
                  <div className='hmodal-view-body-body'>
                    <textarea name='content' rows='10' cols='51' className='content-text'></textarea>
                    <input type="file" name='files' multiple className="file-input"/>
                    <ul id="f-files"></ul>
                  </div>
                </div>

                <div className='hmodal-view-footer'>
                  <div className='hmodal-view-footer-f'>
                    <div className='hmodal-view-footer-f-text'>댓글</div>

                    <div className='hmodal-view-footer-f-view'>
                      <ul>
                        {data.map((item) => {
                          if (item.boardNo === isNo) {
                            return (
                              <li key={item.no}>
                                <div className='comment-header'>
                                  <div className="comment-header-writer">작성자 : {item.writer.nickname}</div>
                                  <div className="comment-header-content">{item.content ? item.content : "내용없음"}</div>
                                  
                                </div>
                                <div className='comment-footer'>
                                  <div className="comment-footer-createDate">
                                    {formatDate(item.createdDate)}
                                  </div>
                                  <button id='comment-delete' className='comment-delete' type='button' onClick={() => commentDelete(item.no)}>X</button>
                                </div>
                              </li>
                            );
                          } else {
                            return null; // 같은 게시글이 아닌 경우에는 댓글을 보여주지 않음
                          }
                        })}
                      </ul>
                    </div>


                  </div>
                  <div className='hmodal-view-footer-s' method='post'>
                    <input type='text' className='comment-text' value={value} onChange={handleChange} onKeyDown={handleKeyDown} />
                    <button type='submit' className='comment-btn' onClick={(e) => { e.preventDefault(); insert(); }}>입력</button>
                  </div>
                </div>

                <div className='hmodal-view-btn'>
                  <button id="btn-update" type="button" class="guest" onClick={updateBtn}>수정</button>
                  <button id='btn-delete' type='button' class="guest" onClick={deleteBtn}>삭제</button>
                </div>
              </div>
            </div>
          </form>
          </div>
      </div>
    </div>
  );
}

export default HModal;