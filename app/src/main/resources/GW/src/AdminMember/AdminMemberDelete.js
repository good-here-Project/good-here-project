import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./AdminMemberModal.css";

const AdminMemberDelete = ({ member, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await axios.delete(`http://localhost/web/members/${member.no}`);
            onDelete(member.no);
            alert("삭제가 완료되었습니다.");
            window.location.reload();
        } catch (error) {
            console.log(error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="AdminMemberDelete">
            <h3>회원 삭제</h3>
            <p>
                회원 번호 {member.no}를 정말 삭제하시겠습니까? 삭제하신 후에는 복구할 수 없습니다.
            </p>
            <div className="form-buttons">
                <button type="button" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? "삭제 중..." : "삭제"}
                </button>
            </div>
        </div>
    );
};

AdminMemberDelete.propTypes = {
    member: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default AdminMemberDelete;