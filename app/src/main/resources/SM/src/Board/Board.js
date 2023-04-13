import "./board.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Board = () => {
  const baseUrl = "http://localhost";
  const [posts, setPosts] = useState([]);

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

  console.log(posts.data);

  return (
    <div className="board-main">
      <div className="cate">
        <ul className="list">
          <Link to="/Form" style={{ textDecoration: "none" }}>
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
          <li>자유</li>
          <li>Q&A</li>
          <li>맛집&이색카페</li>
          <li>여행 정보</li>
          <li>여행 동행</li>
        </ul>
      </div>

      <table
        summary="This table shows how to create responsive tables using Datatables' extended functionality"
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
          {posts.data &&
            posts.data.map((post) => (
              <tr key={post.no}>
                <td>{post.no}</td>
                <Link
                  className="board-body-link"
                  to={`/view/${post.no}`}
                  style={{ textDecoration: "none" }}
                >
                  <td style={{ textAlign: "left" }}>{post.title}</td>
                </Link>
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

{
  /* <div className="_1-iJ">
        <svg viewBox="0 0 16 16" className="_3XWQ">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            d="M6.562 1.5c2.567 0 4.647 2.07 4.647 4.635 0 2.566-2.08 4.646-4.647 4.646s-4.647-2.08-4.647-4.646c0-2.566 2.08-4.635 4.647-4.635zM12.773 12.68L14.6 14.506"
          ></path>
        </svg>
        <input
          type="text"
          placeholder="Search"
          aria-label="Search"
          className="_3fLk"
        />
        <button type="submit" className="_2zEK">
          <svg viewBox="0 0 16 16" className="_3XWQ">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              d="M13.51 13.51l-2.263-2.263"
            ></path>
          </svg>
        </button>
      </div> */
}
{
  /* <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <div>{post.title}</div>
          <div>
            <img src={post.thumbnailUrl} />
          </div>
        </li>
      ))}
    </ul>
    <div className="pagination">
      <ul></ul>
    </div> */
}

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
