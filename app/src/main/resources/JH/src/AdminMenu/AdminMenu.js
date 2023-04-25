import React from 'react';
import './AdminMenu.css';
import { NavLink } from 'react-router-dom';

function AdminMenu() {
    return (
        <div className="adminmenu">
            <NavLink exact to="/" activeClassName="active">홈</NavLink>
            <NavLink to="/" activeClassName="active">관리자 정보</NavLink>
            <NavLink to="/" activeClassName="active">관리자 정보</NavLink>
            <NavLink to="/" activeClassName="active">관리자 정보</NavLink>
            <NavLink to="/" activeClassName="active">관리자 정보</NavLink>
        </div>
    );
}

export default AdminMenu;