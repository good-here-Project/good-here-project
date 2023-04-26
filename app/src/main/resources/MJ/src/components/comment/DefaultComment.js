// CommentForm.js
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CommentForm = ({ content, setComments, no, user }) => {
  const baseUrl = "http://localhost";
  const [enteredContent, setEnteredContent] = useState("");
  const [error, setError] = useState(null);
  const commentInputRef = useRef();
  const navigate = useNavigate();

  console.log("댓글폼");

  const handleChange = (event) => {
    setEnteredContent(event.target.value);
  };

  const handleComment = () => {
    axios({
      method: "POST",
      url: baseUrl + `/web/replys`,
      params: {
        boardNo: content.data.no,
        content: enteredContent,
      },
      withCredentials: true,
    })
      .then((response) => {
        setEnteredContent("");
        axios({
          method: "GET",
          url: `${baseUrl}/web/replys/${no}`,
          cache: true,
          withCredentials: true,
        })
          .then((response) => {
            setComments(response.data);
            window.location.reload();
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="view-comment-main">
      {user.data !== null ? (
        <>
          <div className="view-comment-nickname">{user.data.nickname}</div>
          <textarea
            className="view-comment-content"
            ref={commentInputRef}
            value={enteredContent}
            onChange={handleChange}
            placeholder="댓글을 남겨보세요"
          ></textarea>
          <button
            className="view-comment-insert"
            type="button"
            onClick={handleComment}
          >
            등록
          </button>
        </>
      ) : (
        <>
          <div className="view-comment-nickname">로그인 후 이용 가능합니다</div>
          <textarea
            className="view-comment-content"
            placeholder="로그인후 댓글을 남겨보세요!"
            onClick={() => {
              navigate("/Login");
            }}
            readOnly
          ></textarea>
        </>
      )}
    </div>
  );
};

export default CommentForm;
