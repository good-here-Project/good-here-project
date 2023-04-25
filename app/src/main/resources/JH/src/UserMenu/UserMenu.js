import React from 'react';
import './UserMenu.css';
import { NavLink } from 'react-router-dom';

function UserMenu() {
    return (
        <div className="usermenu">
            <NavLink exact to="/" activeClassName="active">홈</NavLink>
            <NavLink to="/MyPage" activeClassName="active">마이페이지</NavLink>
            <NavLink to="/" activeClassName="active">계정 정보</NavLink>
            <NavLink to="/" activeClassName="active">계정 정보</NavLink>
            <NavLink to="/" activeClassName="active">계정 정보</NavLink>
        </div>
    );
}

export default UserMenu;