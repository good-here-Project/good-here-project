import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./AdminMemberModal.css";

const AdminMemberBlacklist = ({ member, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleBlacklist = async () => {
    setIsUpdating(true);
    try {
      const newState = member.state === 0 ? 1 : 0; // Toggle the state
      const url = `http://localhost/web/members/${member.no}/state`;
      console.log("Request URL:", url);
      const response = await axios.put(url, { state: newState });
      console.log("Update Auth Response:", response);
      onUpdate(response.data);
      const message =
        newState === 1
          ? "회원을 블랙리스트에 추가했습니다."
          : "회원을 블랙리스트에서 제거했습니다.";
      alert(message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="AdminMemberBlacklist">
      <h3>회원 블랙리스트 추가/해제</h3>
      <p>
        회원 번호 {member.no}를{" "}
        {member.state === 1 ? "블랙리스트에서 제거" : "블랙리스트에 추가"}
        하시겠습니까? 추가된 회원은 특정 기능의 이용이 제한됩니다.
      </p>
      <div className="form-buttons">
        <button
          type="button"
          onClick={handleToggleBlacklist}
          disabled={isUpdating}
        >
          {isUpdating
            ? "처리 중..."
            : member.state === 1
            ? "블랙리스트에서 제거"
            : "블랙리스트 추가"}
        </button>
      </div>
    </div>
  );
};

AdminMemberBlacklist.propTypes = {
  member: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AdminMemberBlacklist;
