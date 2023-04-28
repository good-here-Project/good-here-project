import Comment from "./Comment";

function CommentList({ no, comments, user }) {
  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.no} no={no} comment={comment} user={user} />
        ))}
    </div>
  );
}

export default CommentList;
