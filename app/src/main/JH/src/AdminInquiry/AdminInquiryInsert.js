import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AdminInquiryInsert = ({ onInsert, selectedInquiry }) => {
  const [answer, setAnswer] = useState("");

  const handleInputChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleInsertClick = async () => {
    console.log(answer);
    console.log(selectedInquiry.no);
    try {
      const response = await axios.post("http://localhost/web/answers", {
        questionNo: selectedInquiry.no,
        content: answer,
      });
      console.log("Response:", response.data);

      onInsert(answer);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="AdminInquiryInsert">
      <textarea
        value={answer}
        onChange={handleInputChange}
        placeholder="답변을 입력하세요..."
      ></textarea>
      <button onClick={handleInsertClick}>답변 등록</button>
    </div>
  );
};

AdminInquiryInsert.propTypes = {
  onInsert: PropTypes.func.isRequired,
};

export default AdminInquiryInsert;
