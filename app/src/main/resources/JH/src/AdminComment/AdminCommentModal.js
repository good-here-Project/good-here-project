import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AdminCommentModal = ({ isOpen, onClose, selectedComment }) => {
  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div className={`Amodal ${isOpen ? "open" : ""}`}>
      <div className="Amodal-content">
        <div className="Amodal-actions">
          <Link to={`/posts/${selectedComment.postId}`} className="Amodal-link">
            View Post
          </Link>
        </div>
      </div>
    </div>
  );
};

AdminCommentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedComment: PropTypes.object.isRequired,
};

export default AdminCommentModal;
