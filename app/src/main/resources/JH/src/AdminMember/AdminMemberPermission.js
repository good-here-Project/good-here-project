import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./AdminMemberModal.css";

const AdminMemberPermission = ({ member, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleTogglePermission = async () => {
    setIsUpdating(true);
    try {
      let newAuth;
      if (member.auth === 0 || member.auth === 1) {
        newAuth = 2; // Toggle from 0 or 1 to 2 (관리자)
      } else if (member.auth === 2) {
        newAuth = 1; // Toggle from 2 to 1 (일반 사용자)
      }

      if (newAuth !== undefined) {
        const url = `http://localhost/web/members/${member.no}/auth`;
        console.log("Request URL:", url);
        const response = await axios.put(url, { auth: newAuth });
        console.log("Update Auth Response:", response);
        onUpdate(response.data);
        const message =
          newAuth === 1
            ? "회원을 일반 사용자로 변경하였습니다."
            : "회원을 관리자로 변경하였습니다.";
        alert(message);
      } else {
        console.log("Invalid member.auth value:", member.auth);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="AdminMemberPermission">
      <h3>관리자 변경/해제</h3>
      <p>
        회원 번호 {member.no}를{" "}
        {member.auth === 0 || member.auth === 1
          ? "관리자로 변경"
          : "일반 사용자로 변경"}
        하시겠습니까?
      </p>
      <div className="form-buttons">
        <button
          type="button"
          onClick={handleTogglePermission}
          disabled={isUpdating}
        >
          {isUpdating
            ? "처리 중..."
            : member.auth === 0 || member.auth === 1
            ? "관리자로 변경"
            : "일반 사용자로 변경"}
        </button>
      </div>
    </div>
  );
};

AdminMemberPermission.propTypes = {
  member: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AdminMemberPermission;
