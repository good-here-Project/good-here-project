// Comment.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ReComment from "./ReComment";
import "../../styles/comment.css";

function Comment({
  no,
  comment,
  user,
  handleDeleteComment,
  handleReplyComment,
}) {
  const baseUrl = "http://localhost";
  // const { no } = useParams();
  const [editingComment, setEditingComment] = useState(false);
  const [editingReComment, setEditingReComment] = useState(null);
  const [editingContent, setEditingContent] = useState(comment.content);
  const [comments, setComments] = useState([]);
  // console.log("user", user);
  // console.log("comment", comment);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${baseUrl}/web/replys/${no}`,
      cache: true,
      withCredentials: true,
    })
      .then((response) => {
        let allReComments = []; // 모든 자식 댓글을 저장할 배열

        // response.data의 객체들을 순회하며 각 객체의 reComments 프로퍼티를 추출하여 allReComments 배열에 추가
        response.data.forEach((comment) => {
          allReComments = allReComments.concat(comment.reComments);
        });
        setComments(response.data);
        // setReComments(allReComments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [no]);

  // 댓글 수정
  const handleUpdateComment = (id) => {
    const baseUrl = "http://localhost";
    console.log("content", editingContent);

    axios({
      method: "PUT",
      url: `${baseUrl}/web/replys/${id}`,
      withCredentials: true,
      params: {
        content: editingContent,
      },
    })
      .then((response) => {
        // 댓글 업데이트 성공 시, comments 배열에서 해당 댓글을 찾아 업데이트한다.
        const updatedComments = comments.map((comment) => {
          if (comment.no === id) {
            // 해당 댓글을 찾으면 업데이트한다.
            return { ...comment, content: editingContent };
          }
          return comment; // 해당 댓글이 아니면 그대로 반환한다.
        });
        setComments(updatedComments); // 변경된 comments 배열을 설정한다.
        setEditingComment(false); // editingComment를 초기화한다.
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleReComment = () => {
    axios({
      method: "POST",
      url: baseUrl + `/web/replys/child`,
      params: {
        parentCommentNo: editingReComment.no,
        content: editingReComment.content,
      },
      withCredentials: true,
    })
      .then((response) => {
        axios({
          method: "GET",
          url: `${baseUrl}/web/replys/${no}`,
          cache: true,
          withCredentials: true,
        })
          .then((response) => {
            setEditingReComment(null);
            window.location.reload();
            let allReComments = []; // 모든 자식 댓글을 저장할 배열

            // response.data의 객체들을 순회하며 각 객체의 reComments 프로퍼티를 추출하여 allReComments 배열에 추가
            response.data.forEach((comment) => {
              allReComments = allReComments.concat(comment.reComments);
            });
            setComments(response.data);
            comment.reComments(allReComments);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="comment">
      <div className="comment-info">
        <span className="comment-writer">{comment.writer.nickname}</span>
        <span className="comment-content">{comment.content}</span>
        <span className="comment-createdDate">{comment.createdDate}</span>
        {user?.no === comment.writer.no && !editingComment && (
          <div className="comment-buttons">
            <button
              className="comment-edit"
              onClick={() => setEditingComment(true)}
            >
              수정
            </button>
            <button
              className="comment-delete"
              onClick={() => handleDeleteComment(comment.no)}
            >
              삭제
            </button>
          </div>
        )}
      </div>
      {editingComment ? (
        <form onSubmit={(e) => handleUpdateComment(e, comment.no)}>
          <input
            type="text"
            className="comment-edit-form"
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
          />
          <button
            type="button"
            onClick={(e) => handleUpdateComment(comment.no)}
          >
            수정 완료
          </button>
          <button type="button" onClick={() => setEditingComment(false)}>
            취소
          </button>
        </form>
      ) : null}
      <button
        className="comment-reply"
        onClick={() => {
          if (user === null) {
            // Navigate("/Login");
            window.location.href = "http://localhost:3000/Login";
          }
          setEditingReComment(comment);
        }}
      >
        답글
      </button>
      {editingReComment && editingReComment.no === comment.no ? (
        // 답글 입력 폼
        <div className="comment-reply">
          <div className="comment-profile">
            <span className="comment-profile-nickname">{user.nickname}</span>
          </div>
          <textarea
            className="comment-reply-text"
            defaultValue={""}
            // value={editingReComment.content && ""}
            onChange={(e) =>
              setEditingReComment({
                ...editingReComment,
                content: e.target.value,
              })
            }
          />
          <div className="comment-reply-btns">
            <button
              className="comment-reply-cancel-btn"
              type="button"
              onClick={() => setEditingReComment(null)}
            >
              취소
            </button>
            <button
              className="comment-reply-btn"
              type="button"
              onClick={() => handleReComment()}
            >
              등록
            </button>
          </div>
        </div>
      ) : null}
      {comment.reComments.length > 0 && (
        <div className="reComments">
          {comment.reComments.map((reComment) => (
            <ReComment
              key={reComment.no}
              reComment={reComment}
              user={user}
              editingReComment={editingReComment}
              setEditingReComment={setEditingReComment}
              handleUpdateComment={handleUpdateComment}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
