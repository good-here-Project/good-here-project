// ReComment.js
import axios from "axios";
import React, { useState } from "react";
import "../../styles/recomment.css";

function ReComment({
  reComment,
  user,
  editingReComment,
  setEditingReComment,
  handleUpdateComment,
  handleDeleteComment,
}) {
  const baseUrl = "http://localhost";
  const [editing, setEditing] = useState(false);
  const [editingContent, setEditingContent] = useState(reComment.content);
  const [reComments, setReComments] = useState([]);

  // 대댓글 수정
  const handleUpdateReComment = (no) => {
    console.log(no);
    console.log("editingContent", editingContent);
    // console.log(editingReComment.content);
    axios({
      method: "PUT",
      url: `${baseUrl}/web/replys/child/${no}`,
      withCredentials: true,
      params: {
        content: editingContent,
      },
    })
      .then((response) => {
        // 댓글 업데이트 성공 시, comments 배열에서 해당 댓글을 찾아 업데이트한다.
        // console.log("대댓글 수정 성공");
        // const updatedComments = reComments.map((recomment) => {
        //   if (recomment.no === no) {
        //     // 해당 댓글을 찾으면 업데이트한다.
        //     return { ...recomment, content: editingReComment.content };
        //   }
        //   return recomment; // 해당 댓글이 아니면 그대로 반환한다.
        // });
        // setReComments(updatedComments); // 변경된 comments 배열을 설정한다.

        setEditingReComment(null); // editingComment를 초기화한다.
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteReComment = (no) => {
    console.log(no);
    axios({
      method: "DELETE",
      url: `${baseUrl}/web/replys/child/${no}`,
      withCredentials: true,
    })
      .then(() => {
        // console.log("success");
        const updatedComments = reComments.filter(
          (recomment) => recomment.no !== no
        );
        // console.log(updatedComments);
        setReComments(updatedComments);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="reComment">
      <div className="reComment-info">
        <span className="reComment-writer">{reComment.writer.nickname}</span>
        <span className="reComment-content">{reComment.content}</span>
        <span className="reComment-createdDate">{reComment.createdDate}</span>

        {user?.no === reComment.writer.no && !editing && (
          <div className="reComment-buttons">
            <button className="reComment-edit" onClick={() => setEditing(true)}>
              수정
            </button>
            <button
              className="reComment-delete"
              onClick={() => handleDeleteReComment(reComment.no)}
            >
              삭제
            </button>
          </div>
        )}
      </div>
      {editing ? (
        <form
          onSubmit={(e) => handleUpdateComment(reComment.content, reComment.no)}
        >
          <input
            type="text"
            className="reComment-edit-form"
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
          />
          <button
            type="button"
            onClick={(e) => handleUpdateReComment(reComment.no)}
          >
            수정 완료
          </button>
          <button type="button" onClick={() => setEditing(false)}>
            취소
          </button>
        </form>
      ) : null}
    </div>
  );
}

export default ReComment;
