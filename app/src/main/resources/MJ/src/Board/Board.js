import "./board.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Category from "../components/BoardCategory";
import BoardTable from "../components/BoardTable";
import Pagination from "../components/Pagination";
import Nav from "../components/Navigation";
import SearchBar from "../components/SearchBar";

const Board = () => {
  const baseUrl = "http://localhost";
  const POSTS_PER_PAGE = 10;

  const [posts, setPosts] = useState([]);
  const [selectedBoardType, setSelectedBoardType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterBoardList, setFilterBoardList] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/web/boards`, {
          withCredentials: true,
        });
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = (keyword) => {
    axios
      .get(`${baseUrl}/web/boards`, {
        params: { keyword },
      })
      .then((response) => {
        setFilterBoardList(response.data);
        console.log("filterBoardList", filterBoardList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const boardTypeValue = (type) => {
    switch (type) {
      case 1:
        return "자유";
      case 2:
        return "질문";
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

  const filteredSearchPosts = selectedBoardType
    ? filterBoardList.data.filter(
        (post) => post.boardTypeId === selectedBoardType
      )
    : filterBoardList?.data || [];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const nextPage = currentPage + 1;
    if (nextPage <= maxPage) {
      setCurrentPage(nextPage);
    }
  };

  const maxPage = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  // const slicedPosts = filteredPosts.slice(startIndex, endIndex);
  const sliceFilterPosts = () => {
    if (filterBoardList !== null) {
      return filteredSearchPosts.slice(startIndex, endIndex);
    } else {
      return filteredPosts.slice(startIndex, endIndex);
    }
  };

  return (
    <div className="board-main">
      <Nav />
      <Category
        selectedBoardType={selectedBoardType}
        setSelectedBoardType={setSelectedBoardType}
      />
      <BoardTable
        posts={posts}
        boardTypeValue={boardTypeValue}
        filteredPosts={filteredPosts}
        slicedPosts={sliceFilterPosts()}
      />
      <Pagination
        currentPage={currentPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        maxPage={maxPage}
      />
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default Board;
