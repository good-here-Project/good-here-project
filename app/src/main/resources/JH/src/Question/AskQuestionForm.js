import React, { useState } from "react";
import axios from "axios";
import "./AskQuestionForm.css";

function AskQuestionForm({ onCloseForm, onQuestionPosted }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handlePostQuestion = async () => {
    try {
      const response = await axios.post(
        "http://localhost/web/questions",
        null,
        {
          params: {
            title,
            content,
          },
        }
      );
      console.log(response.data);
      onQuestionPosted(); // Call the callback function to update the inquiries after posting the question
    } catch (error) {
      console.log(error);
      // Handle error
    }
    onCloseForm(); // Close the form
    setTitle(""); // Clear the title input
    setContent(""); // Clear the content input
  };

  return (
    <div className="Amodal open">
      <div className="Amodal-content">
        <div className="Amodal-question">
          <p3>질문하기</p3>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="제목"
          />
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="내용"
          />
          <button type="button" onClick={handlePostQuestion}>
            작성하기
          </button>
          <button className="Amodal-close" onClick={onCloseForm}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default AskQuestionForm;
