import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

function CommentList({
  no,
  comments,
  reComments,
  setComments,
  setReComments,
  user,
}) {
  const baseUrl = "http://localhost";
  // const { no } = useParams();
  const [error, setError] = useState(null);
  const [editingComment, setEditingComment] = useState(null);

  console.log("comments", comments);
  console.log("user", user);

  // 댓글 삭제
  const handleDeleteComment = (id) => {
    axios({
      method: "DELETE",
      url: `${baseUrl}/web/replys/${id}`,
      withCredentials: true,
    })
      .then(() => {
        // console.log("success");
        const updatedComments = comments.filter((comment) => comment.no !== id);
        setComments(updatedComments);
        window.location.reload();
      })
      .catch((error) => {
        setError(error);
      });
  };

  const totalComments = () => {
    return comments.length + reComments.length;
  };

  console.log("no", no);

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.no}
            no={no}
            comment={comment}
            user={user}
            comments={comments}
            setComments={setComments}
            setEditingComment={setEditingComment}
            setError={setError}
            handleDeleteComment={handleDeleteComment}
          />
        ))}
    </div>
  );
}

export default CommentList;
