import { Link } from "react-router-dom";

const Nav = () => {
  return (
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
  );
};

export default Nav;
