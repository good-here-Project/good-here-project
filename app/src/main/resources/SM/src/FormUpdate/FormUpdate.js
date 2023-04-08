import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// import "./view.css";

// const navigate = useNavigate();

const FormUpdate = () => {
  const baseUrl = "http://localhost";
  const { no } = useParams();
  const [content, setContent] = useState({ data: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevNoRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (event) => {
    setContent((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        title: event.target.value,
      },
    }));
  };

  const handleBoardTypeIdChange = (event) => {
    setContent((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        boardTypeId: event.target.value,
      },
    }));
  };

  const handleContentChange = (event) => {
    setContent((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        content: event.target.value,
      },
    }));
  };

  useEffect(() => {
    if (prevNoRef.current !== no) {
      axios({
        method: "GET",
        url: baseUrl + `/web/boards/${no}`,
        cache: true,
        withCredentials: true,
      })
        .then((response) => {
          setContent(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error);
        });
      prevNoRef.current = no;
    } else {
      setIsLoading(false);
    }
  }, [no]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = document.querySelector("#board-form");
    const formData = new FormData(form);
    axios({
      method: "PUT",
      url: baseUrl + `/web/boards/${no}`,
      data: formData,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        setIsSubmitting(false);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="form-body">
      <div className="wrapper">
        <div className="form-box">
          <h2>글쓰기</h2>
          <div className="form-box-input-form">
            <Form
              className="form-b"
              id="board-form"
              encType="multipart/form-data"
            >
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>카테고리</Form.Label>
                  <Form.Select
                    name="boardTypeId"
                    style={{ width: "300px" }}
                    defaultValue={content.data?.boardTypeId}
                    onChange={handleBoardTypeIdChange}
                  >
                    <option value="1">자유</option>
                    <option value="2">Q&A</option>
                    <option value="3">맛집&이색 카페</option>
                    <option value="4">여행 정보</option>
                    <option value="5">여행 동행</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>제목</Form.Label>
                  <Form.Control
                    name="title"
                    style={{ width: "700px" }}
                    onChange={handleTitleChange}
                    value={content.data?.title}
                  />
                </Form.Group>

                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label>파일 업로드</Form.Label>
                  <Form.Control name="files" type="file" multiple />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>내용</Form.Label>
                  <Form.Control
                    name="content"
                    as="textarea"
                    onChange={handleContentChange}
                    value={content.data?.content}
                    style={{ height: "280px" }}
                  />
                </Form.Group>
              </Row>
              <Row className="justify-content-center">
                <Button
                  id="btn-insert"
                  variant="danger"
                  type="submit"
                  style={{ width: "150px" }}
                  onClick={handleSubmit}
                >
                  작성
                </Button>
                <Button
                  id="btn-cancel"
                  variant="danger"
                  type="cancel"
                  style={{ width: "150px" }}
                  // onClick={handleCancel}
                >
                  이전
                </Button>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormUpdate;
