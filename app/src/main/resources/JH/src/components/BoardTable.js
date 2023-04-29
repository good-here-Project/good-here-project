import { Link } from "react-router-dom";

const BoardTable = ({ boardTypeValue, slicedPosts }) => {
  // console.log("slicePosts", slicedPosts);
  return (
    <div className="board-table-div">
      <table
        className="table table-bordered table-hover dt-responsive"
        id="board-table"
      >
        <thead className="board-head">
          <tr>
            <th width="100px">번호</th>
            <th>제목</th>
            <th width="200px">글쓴이 </th>
            <th width="100px">추천수</th>
            <th width="200px">작성일</th>
            <th width="100px">조회수</th>
          </tr>
        </thead>
        <tbody className="board-body">
          {slicedPosts
            .filter((post) => post.boardTypeId !== 0)
            .map((post) => (
              <tr key={post.no}>
                <td
                  className={`board-body-type ${boardTypeValue(
                    post.boardTypeId
                  ).toLowerCase()}`}
                >
                  {boardTypeValue(post.boardTypeId)}
                </td>
                <td>
                  <Link
                    className="board-body-link"
                    to={`/view/${post.no}`}
                    style={{ textDecoration: "none" }}
                  >
                    {post.title}
                  </Link>
                </td>
                <td>{post.writer.nickname}</td>
                <td>{post.viewCount}</td>
                <td>{post.createdDate}</td>
                <td>{post.viewCount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoardTable;
