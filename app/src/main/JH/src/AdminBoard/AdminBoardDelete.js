import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
//import "./AdminBoardModal.css";

const AdminBoardDelete = ({ board, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // axios
    //   .delete(`http://localhost/web/boards/${board.no}`)
    //   .then((response) => {
    //     if (response.data.status === "success") {
    //       // Deletion was successful
    //       alert("삭제가 완료되었습니다.");
    //       onDelete(board.no);
    //     } else {
    //       // Deletion failed
    //       alert("삭제에 실패했습니다.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // Handle the error condition
    //     alert("삭제에 실패했습니다. 에러: " + error.message);
    //   })
    //   .finally(() => {
    //     setIsDeleting(false);
    //   });

    axios({
      method: "DELETE",
      url: `http://localhost/web/boards/${board.no}`,
      withCredentials: true,
    })
      .then(() => {
        console.log("success");
        onDelete(board.no);
        // 삭제 요청이 성공하면 목록 페이지로 이동합니다.
        // navigate("/board");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div className="AdminBoardDelete">
      <h3>게시물 삭제</h3>
      <p>
        게시물 번호 {board.no}를 정말 삭제하시겠습니까? 삭제하신 후에는 복구할
        수 없습니다.
      </p>
      <div className="form-buttons">
        <button type="button" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "삭제 중..." : "삭제"}
        </button>
      </div>
    </div>
  );
};

AdminBoardDelete.propTypes = {
  board: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AdminBoardDelete;
