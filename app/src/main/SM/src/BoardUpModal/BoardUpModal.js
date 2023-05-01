import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMemo, useRef, useState } from "react";
axios.defaults.withCredentials = true;

const BoardUpModal = (props) => {
  const { isOpen, onClose } = props;
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const quillRef = useRef(null);

  const handleInsert = () => {
    const form = document.querySelector("#board-form");
    console.log(form);
    const formData = new FormData(form);
    formData.append("content", content);
    console.log(content);
    console.log(formData);

    const baseUrl = "http://localhost";

    axios({
      method: "POST",
      url: baseUrl + "/web/boards",
      data: formData,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response.data);
        window.location.href = baseUrl + ":3000/Board";
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    navigate("/board");
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
        ],
      },
    };
  }, []);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "image",
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="upmodal-background"
      onClick={(e) => {
        // 모달 내부를 클릭한 경우에는 모달이 닫히지 않도록 합니다.
        if (e.target.closest(".upmodal") !== null) {
          return;
        }
        onClose();
      }}
    >
      <div className="upmodal-overlay">
        <div className="upmodal">
          <div className="form-box">
            <h2>커뮤니티 글쓰기</h2>
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
                      defaultValue="1"
                    >
                      <option value="1">자유</option>
                      <option value="2">Q&A</option>
                      <option value="3">맛집&이색 카페</option>
                      <option value="4">여행 정보</option>
                      <option value="5">여행 동행</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>제목: </Form.Label>
                    <Form.Control name="title" style={{ width: "700px" }} />
                  </Form.Group>

                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>파일 업로드</Form.Label>
                    <Form.Control name="files" type="file" multiple />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <ReactQuill
                      id="content"
                      style={{ height: "240px" }}
                      value={content}
                      onChange={setContent}
                      ref={quillRef}
                      modules={modules}
                      formats={formats}
                    />
                  </Form.Group>
                </Row>
                <Row className="justify-content-center">
                  <Button
                    type="button"
                    style={{ width: "150px" }}
                    onClick={handleInsert}
                  >
                    작성
                  </Button>
                  <Button
                    variant="danger"
                    type="cancel"
                    style={{ width: "150px" }}
                    onClick={onClose}
                  >
                    이전
                  </Button>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardUpModal;
