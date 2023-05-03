import React, { useEffect } from "react";
import "./AdminAlertModal.css";

function AdminAlertModal({ isOpen, onClose }) {
  useEffect(() => {
    let timeoutId;

    if (isOpen) {
      timeoutId = setTimeout(() => {
        onClose(); // Call the onClose function after 2 seconds
        redirectToMainPage();
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the component is unmounted before 2 seconds
    };
  }, [isOpen, onClose]);

  const redirectToMainPage = () => {
    window.location.href = "/main"; // Redirect to the main page
  };

  if (!isOpen) {
    return null; // Render nothing if isOpen is false
  }

  return (
    <div className="adminAlertModal">
      <div className="adminAlertModal-content">
        <span className="adminAlertModal-message">접근 권한이 없습니다!</span>
      </div>
    </div>
  );
}

export default AdminAlertModal;
