import "./board.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Board = () => {
  const baseUrl = "http://localhost";
  const [posts, setPosts] = useState(null);
  const [selectedBoardType, setSelectedBoardType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 10;

  useEffect(() => {
    axios({
      method: "GET",
      url: baseUrl + "/web/boards",
      withCredentials: true,
    })
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const boardTypeValue = (type) => {
    switch (type) {
      case 1:
        return "자유";
      case 2:
        return "Q & A";
      case 3:
        return "맛집&카페";
      case 4:
        return "여행 정보";
      case 5:
        return "여행 동행";
      default:
        return "";
    }
  };

  const filteredPosts = selectedBoardType
    ? posts.data.filter((post) => post.boardTypeId === selectedBoardType)
    : posts?.data || [];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const nextpage = currentPage + 1;
    if (nextpage <= maxPage) {
      setCurrentPage(nextpage);
    }
  };

  const maxPage = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const slicedPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <div className="board-main">
      <div className="cate">
        <ul className="list">
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className="hot-place">HOT 플레이스</li>
          </Link>
          <Link to="/Board" style={{ textDecoration: "none" }}>
            <li className="board">커뮤니티</li>
          </Link>
        </ul>
        <ul className="list-best">
          <li>인기순</li>
        </ul>
      </div>
      <div className="board-cate">
        <ul className="board-list">
          <li onClick={() => setSelectedBoardType(null)}>전체</li>
          <li onClick={() => setSelectedBoardType(1)}>자유</li>
          <li onClick={() => setSelectedBoardType(2)}>Q&A</li>
          <li onClick={() => setSelectedBoardType(3)}>맛집&카페</li>
          <li onClick={() => setSelectedBoardType(4)}>여행 정보</li>
          <li onClick={() => setSelectedBoardType(5)}>여행 동행</li>
        </ul>
      </div>
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
        <tbody className="board-body" id="tbody">
          {slicedPosts.map((post) => (
            <tr key={post.no}>
              <td className="board-body-type">
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
      <div className="board-pagination">
        <button disabled={currentPage === 1} onClick={handlePrevPage}>
          이전
        </button>
        <button disabled={currentPage === maxPage} onClick={handleNextPage}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Board;
