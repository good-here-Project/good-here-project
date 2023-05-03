import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Question.css";
import InquiryDetails from "./InquiryDetails";
import AskQuestionForm from "./AskQuestionForm";
import AnswerCheck from "./AnswerCheck";

function Question() {
  const [inquiries, setInquiries] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inquiriesPerPage = 10;

  useEffect(() => {
    fetchInquiries();
    fetchAnswers();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get("http://localhost/web/auth/user");
      const response2 = await axios.get(
        "http://localhost/web/questions/mylist"
      );
      const result = response2.data;

      if (Array.isArray(result.data)) {
        const filteredInquiries = result.data.filter(
          (inquiry) => inquiry.writer.nickname === response.data.data.nickname
        );
        setInquiries(filteredInquiries);
      } else {
        console.log("데이터가 배열이 아닙니다.");
      }
    } catch (error) {
      alert("게시물 정보를 가져오는 중 오류 발생!");
      console.log(error);
    }
  };

  const fetchAnswers = () => {
    axios
      .get("http://localhost/web/answers")
      .then((response) => response.data)
      .then((result) => {
        if (Array.isArray(result.data)) {
          setAnswers(result.data);
        } else {
          console.log("데이터가 배열이 아닙니다.");
        }
      })
      .catch((exception) => {
        alert("답변 정보를 가져오는 중 오류 발생!");
        console.log(exception);
      });
  };

  const handleAnswerDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setSelectedAnswer(answers[inquiry.no] || {});
    setIsModalOpen(true);
  };

  const handleInsertClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleQuestionPosted = () => {
    fetchInquiries();
    setShowForm(false);
  };

  const handleViewDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const isAnswered = (inquiryNo) => {
    return answers.hasOwnProperty(inquiryNo);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = inquiries.slice(
    indexOfFirstInquiry,
    indexOfLastInquiry
  );

  return (
    <div className="adminInquiry">
      <h2>QnA</h2>
      <button
        type="button"
        className="question-btn"
        onClick={handleInsertClick}
      >
        질문하기
      </button>
      {showForm && (
        <AskQuestionForm
          onCloseForm={handleCloseForm}
          onQuestionPosted={handleQuestionPosted}
        />
      )}
      {selectedInquiry && !isModalOpen && (
        <InquiryDetails
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
        />
      )}
      <table className="adminInquiry-table">
        <thead>
          <tr>
            <th>문의 글 번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>내용보기</th>
            <th>답변확인</th>
            <th>답변여부</th>
          </tr>
        </thead>
        <tbody>
          {currentInquiries.map((inquiry) => (
            <tr key={inquiry.no}>
              <td>{inquiry.no}</td>
              <td>{inquiry.title}</td>
              <td>{inquiry.writer.nickname}</td>
              <td>{inquiry.createdDate}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleViewDetails(inquiry)}
                >
                  내용보기
                </button>
              </td>
              <td>
                {isAnswered(inquiry.no) && (
                  <button
                    type="button"
                    onClick={() => handleAnswerDetails(inquiry)}
                    className="answer-detailsBtn"
                  >
                    상세정보
                  </button>
                )}
              </td>
              <td>{isAnswered(inquiry.no) ? "답변완료" : "미답변"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(inquiries.length / inquiriesPerPage),
        }).map((_, index) => (
          <button
            key={index}
            className={`pagination-btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {isModalOpen && selectedInquiry && (
        <AnswerCheck
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedInquiry={selectedInquiry}
          selectedAnswer={selectedAnswer}
        />
      )}
    </div>
  );
}

export default Question;
