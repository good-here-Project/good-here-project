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
      const url = `http://localhost/web/members/${member.no}/auth`;
      console.log("Request URL:", url); // 로그 추가
      const response = await axios.put(url, { auth: updatedMember.auth });
      console.log("Update Auth Response:", response);
      onUpdate(response.data);
    } catch (error) {
      console.log("Update Auth Error:", error);
    }
  };

  if (!updatedMember) {
    return null;
  }

  return (
    <div className="admin-member-update">
      <h2>회원 정보</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이름:</label>
          <span>{updatedMember.name}</span>
        </div>
        <div>
          <label>이메일:</label>
          <span>{updatedMember.email}</span>
        </div>

        <div>
          <label>전화번호:</label>
          <span>{updatedMember.tel}</span>
        </div>
        <div>
          <label>닉네임:</label>
          <span>{updatedMember.nickname}</span>
        </div>
        <h2>권한 관리</h2>
        <div>
          <label>권한:</label>
          <select
            name="auth"
            value={updatedMember.auth}
            onChange={handleChange}
          >
            <option value={1}>일반 회원</option>
            <option value={2}>관리자</option>
          </select>
        </div>
        <div className="buttons">
          <button type="submit">저장</button>
          <button type="button" onClick={onClose}>
            취소
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
