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
              <td>{boardTypeValue(post.boardTypeId)}</td>
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

// return (
//   <div className="board-main">
//     <div className="cate">
//       <ul className="list">
//         <Link to="/" style={{ textDecoration: "none" }}>
//           <li className="hot-place">HOT 플레이스</li>
//         </Link>
//         <Link to="/Board" style={{ textDecoration: "none" }}>
//           <li className="board">커뮤니티</li>
//         </Link>
//       </ul>
//       <ul className="list-best">
//         <li>인기순</li>
//       </ul>
//     </div>
//     <div className="board-cate">
//       <ul className="board-list">
//         <li onClick={() => setSelectedBoardType(null)}>전체</li>
//         <li onClick={() => setSelectedBoardType(1)}>자유</li>
//         <li onClick={() => setSelectedBoardType(2)}>Q&A</li>
//         <li onClick={() => setSelectedBoardType(3)}>맛집&카페</li>
//         <li onClick={() => setSelectedBoardType(4)}>여행 정보</li>
//         <li onClick={() => setSelectedBoardType(5)}>여행 동행</li>
//       </ul>
//     </div>
//     <table
//       className="table table-bordered table-hover dt-responsive"
//       id="board-table"
//     >
//       <thead className="board-head">
//         <tr>
//           <th width="100px">번호</th>
//           <th>제목</th>
//           <th width="200px">글쓴이 </th>
//           <th width="100px">추천수</th>
//           <th width="200px">작성일</th>
//           <th width="100px">조회수</th>
//         </tr>
//       </thead>
//       <tbody className="board-body" id="tbody">
//         {filteredPosts &&
//           filteredPosts.slice(0, 10).map((post) => (
//             <tr key={post.no}>
//               <td>{boardTypeValue(post.boardTypeId)}</td>
//               <td>
//                 <Link
//                   className="board-body-link"
//                   to={`/view/${post.no}`}
//                   style={{ textDecoration: "none" }}
//                 >
//                   {post.title}
//                 </Link>
//               </td>
//               <td>{post.writer.nickname}</td>
//               <td>{post.likesCount}</td>
//               <td>{post.createdDate}</td>
//               <td>{post.viewCount}</td>
//             </tr>
//           ))}
//       </tbody>
//     </table>
//   </div>
// );

// const element = document.querySelector(".pagination ul");
// let totalPages = 20;
// let page = 1;
// //calling function with passing parameters and adding inside element which is ul tag
// element.innerHTML = createPagination(totalPages, page);

// function createPagination(totalPages, page) {
//   let liTag = "";
//   let active;
//   let beforePage = page - 1;
//   let afterPage = page + 1;
//   if (page > 1) {
//     //show the next button if the page value is greater than 1
//     liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${
//       page - 1
//     })"><span><i class="fas fa-angle-left"></i> 이전</span></li>`;
//   }
//   if (page > 2) {
//     //if page value is less than 2 then add 1 after the previous button
//     liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
//     if (page > 3) {
//       //if page value is greater than 3 then add this (...) after the first li or page
//       liTag += `<li class="dots"><span>...</span></li>`;
//     }
//   }
//   // how many pages or li show before the current li
//   if (page == totalPages) {
//     beforePage = beforePage - 2;
//   } else if (page == totalPages - 1) {
//     beforePage = beforePage - 1;
//   }
//   // how many pages or li show after the current li
//   if (page == 1) {
//     afterPage = afterPage + 2;
//   } else if (page == 2) {
//     afterPage = afterPage + 1;
//   }
//   for (var plength = beforePage; plength <= afterPage; plength++) {
//     if (plength > totalPages) {
//       //if plength is greater than totalPage length then continue
//       continue;
//     }
//     if (plength == 0) {
//       //if plength is 0 than add +1 in plength value
//       plength = plength + 1;
//     }
//     if (page == plength) {
//       //if page is equal to plength than assign active string in the active variable
//       active = "active";
//     } else {
//       //else leave empty to the active variable
//       active = "";
//     }
//     liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
//   }
//   if (page < totalPages - 1) {
//     //if page value is less than totalPage value by -1 then show the last li or page
//     if (page < totalPages - 2) {
//       //if page value is less than totalPage value by -2 then add this (...) before the last li or page
//       liTag += `<li class="dots"><span>...</span></li>`;
//     }
//     liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
//   }
//   if (page < totalPages) {
//     //show the next button if the page value is less than totalPage(20)
//     liTag += `<li class="btn next" onclick="createPagination(totalPages, ${
//       page + 1
//     })"><span>다음 <i class="fas fa-angle-right"></i></span></li>`;
//   }
//   element.innerHTML = liTag; //add li tag inside ul tag
//   return liTag; //reurn the li tag
// }

export default Board;
