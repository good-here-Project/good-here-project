import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./AdminMemberModal.css";

const AdminMemberUpdate = ({ member, onUpdate, onClose }) => {
    const [updatedMember, setUpdatedMember] = useState(null);

    useEffect(() => {
        setUpdatedMember(member);
    }, [member]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedMember((prevMember) => ({
            ...prevMember,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost/web/members/${member.no}`, updatedMember);
            onUpdate(response.data);
            alert('변경이 완료되었습니다.');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    if (!updatedMember) {
        return null;
    }

    return (
        <div className="AdminMemberUpdate">
            <form onSubmit={handleSubmit}>
                <h3>회원정보</h3>
                <div className="form-group">
                    <label htmlFor="no">회원 번호:</label>
                    <span id="no">{updatedMember?.no}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="name">이 름:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={updatedMember?.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nickname">닉네임:</label>
                    <input
                        type="text"
                        name="nickname"
                        id="nickname"
                        value={updatedMember?.nickname}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">이메일:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={updatedMember?.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tel">번 호:</label>
                    <input
                        type="tel"
                        name="tel"
                        id="tel"
                        value={updatedMember?.tel}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">상 태:</label>
                    <select
                        name="state"
                        id="state"
                        value={updatedMember?.state}
                        onChange={handleChange}
                    >
                        <option value="ACTIVE">활성화</option>
                        <option value="INACTIVE">비활성화</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="auth">권 한:</label>
                    <select
                        name="auth"
                        id="auth"
                        value={updatedMember?.auth}
                        onChange={handleChange}
                    >
                        <option value="MEMBER">회원</option>
                        <option value="ADMIN">관리자</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="createdDate">가입일:</label>
                    <span id="createdDate">{updatedMember?.createdDate}</span>
                </div>
                <div className="form-buttons">
                    <button type="submit">수정</button>
                    <button type="button" onClick={onClose}>
                        닫기
                    </button>
                </div>
            </form>
        </div>
    );
};

AdminMemberUpdate.propTypes = {
    member: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AdminMemberUpdate;
