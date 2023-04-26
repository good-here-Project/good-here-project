import React from 'react';
import './UserMenu.css';
import { NavLink } from 'react-router-dom';

function UserMenu() {
    return (
        <div className="usermenu">
            <NavLink exact to="/" activeClassName="active">홈</NavLink>
            <NavLink to="/" activeClassName="active">계정 관리</NavLink>
            <NavLink to="/MyPage" activeClassName="active">프로필 관리</NavLink>
            <NavLink to="/" activeClassName="active">내 글 관리</NavLink>
            <NavLink to="/" activeClassName="active">...</NavLink>
        </div>
    );
}

export default UserMenu;