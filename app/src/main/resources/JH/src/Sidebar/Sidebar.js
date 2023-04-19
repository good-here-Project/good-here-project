import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 import 추가
import './Sidebar.css';

function Sidebar({ isOpen, setIsOpen }) {
    const outside = useRef();

    useEffect(() => {
        document.addEventListener('mousedown', handlerOutside);
        return () => {
            document.removeEventListener('mousedown', handlerOutside);
        };
    }, []);

    const handlerOutside = (e) => {
        if (!outside.current.contains(e.target)) {
            toggleSide();
        }
    };

    const toggleSide = () => {
        setIsOpen(false);
    };

    return (
        <div
            id="sidebar"
            ref={outside}
            className={`sidebar ${isOpen ? 'open' : ''}`}
        >
            <img src="/img/close.png" alt="close" onClick={toggleSide} onKeyDown={toggleSide} />
            <ul>
                <Link to='/AdminMember' style={{ textDecoration: "none" }}><li className="adminmember" id="adminmember">회원관리</li></Link>
                <li>메뉴2</li>
                <li>메뉴3</li>
            </ul>
        </div>
    );
}

export default Sidebar;
