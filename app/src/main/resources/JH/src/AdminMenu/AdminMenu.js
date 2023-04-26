import React from 'react';
import './AdminMenu.css';
import { NavLink } from 'react-router-dom';

function AdminMenu() {
    return (
        <div className="adminmenu">
            <NavLink exact to="/" activeClassName="active">홈</NavLink>
            <NavLink to="/AdminMember" activeClassName="active">회원 관리</NavLink>
            <NavLink to="/AdminBoard" activeClassName="active">게시글 관리</NavLink>
            <NavLink to="/" activeClassName="active">...</NavLink>
            <NavLink to="/" activeClassName="active">...</NavLink>
        </div>
    );
}

export default AdminMenu;