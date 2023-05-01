import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FormUpdate = (props) => {
  const baseUrl = "http://localhost";
  const { no } = useParams();
  const [content, setContent] = useState({
    data: { boardTypeId: "", title: "", content: "" },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevNoRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileList, setFileList] = useState([]);
  const quillRef = React.useRef();
  // const { file, setFile } = props;

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

  const handleTitleChange = (event) => {
    setContent((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        title: event.target.value,
      },
    }));
    console.log(setContent);
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

  const handleContentChange = (value) => {
    setContent((prevState) => ({
      data: {
        ...prevState.data,
        content: value,
      },
    }));
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newFileList = [...fileList];
    for (let i = 0; i < files.length; i++) {
      newFileList.push(files[i]);
    }
    setFileList(newFileList);
  };

  const removeFile = (index) => {
    if (fileList.length === 0) return;
    const newFileList = [...fileList];
    newFileList.splice(index, 1);
    setFileList(newFileList);

    const li = document.getElementById(`li-${index}`);
    const form = document.getElementById("form-f-flies");
    form && form.removeChild(li);
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

  function deleteFile(boardNo, fileNo) {
    axios
      .delete(baseUrl + `/web/boards/${boardNo}/files/${fileNo}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.status === "success") {
          let li =
            document.querySelector("#li-" + fileNo) &&
            document.querySelector("#li-" + fileNo);
          let form = document.querySelector("#form-f-flies");
          form && form.removeChild(li);
          let updatedFileList = content.data.attachedFiles.filter(
            (file) => file.no !== fileNo
          );
          setContent({
            ...content,
            data: { ...content.data, attachedFiles: updatedFileList },
          });
        } else {
          throw new Error(
            "HTTP error, status = " + response.status + ", " + response.data.msg
          );
        }
      })
      .catch((error) => {
        // alert("파일 삭제 중 오류 발생!");
        console.error(error);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = document.querySelector("#board-form");
    const formData = new FormData(form);

    console.log(content.data?.content);

    formData.append("content", content.data?.content);
    // console.log(formData);
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
                  <Form.Control
                    name="files"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                  />
                </Form.Group>

                {/* 기존 fileList */}
                {fileList.map((file, index) => (
                  <div key={index}>
                    <span>{file.name}</span>
                    <button onClick={() => removeFile(index)}>삭제</button>
                  </div>
                ))}

                <div className="form-f-flies">
                  {content.data.attachedFiles &&
                    content.data.attachedFiles.map(
                      (file) =>
                        file.filepath !== null && (
                          <li key={file.no} id={`li-${file.no}`}>
                            <a
                              href={`https://kr.object.ncloudstorage.com/bitcamp-bucket11-member-photo/${file.filepath}`}
                            >
                              {file.originalFilename}
                            </a>
                            <button
                              onClick={() =>
                                deleteFile(content.data.no, file.no)
                              }
                            >
                              삭제
                            </button>
                          </li>
                        )
                    )}
                </div>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>내용</Form.Label>
                  {/* <Form.Control
                    name="content"
                    as="textarea"
                    onChange={handleContentChange}
                    defaultValue={content.data?.content}
                    // value={content.data?.content}
                    style={{ height: "280px" }}
                  /> */}
                  <ReactQuill
                    name="content"
                    ref={quillRef}
                    value={content.data.content}
                    style={{ height: "240px" }}
                    onChange={handleContentChange}
                    modules={modules}
                    formats={formats}
                  />
                </Form.Group>
              </Row>
              <Row className="justify-content-center">
                <Button
                  id="btn-insert"
                  variant="danger"
                  type="button"
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
