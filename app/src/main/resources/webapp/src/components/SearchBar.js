import axios from "axios";
import { useState } from "react";
import "../styles/searchbar.css";

function SearchBar({ onSearch }) {
  const [editingSearch, setEditingSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(editingSearch);
    // console.log("click");
  };

  return (
    <div className="board-search">
      <div className="board-search-box">
        <form id="board-search">
          <input
            type="text"
            name="keyword"
            value={editingSearch}
            onChange={(e) => setEditingSearch(e.target.value)}
            placeholder="Search..."
          />
          <button className="board-search-button" type="button">
            <img
              className="board-search-image"
              src="./img/board-search.svg"
              alt="image"
              onClick={handleSubmit}
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;