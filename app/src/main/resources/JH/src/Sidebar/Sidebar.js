import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar">
            <NavLink exact to="/" activeClassName="active">홈</NavLink>
            <NavLink to="/AdminMember" activeClassName="active">회원 관리</NavLink>
            <NavLink to="/AdminBoard" activeClassName="active">게시물 관리</NavLink>
            <NavLink to="/AdminComment" activeClassName="active">댓글 관리</NavLink>
            <NavLink to="/AdminInquiry" activeClassName="active">QnA</NavLink>
        </div>
    );
}

export default Sidebar;
