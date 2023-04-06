import "../Form/form.css";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormComm = () => {
  const navigate = useNavigate();

  const handleInsert = () => {
    const form = document.querySelector("#board-form");
    const formData = new FormData(form);

    const baseUrl = "http://localhost";

    axios({
      method: "POST",
      url: baseUrl + "/web/boards",
      data: formData,
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data);
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          navigate("/board");
          console.log("success");
        } else if (result.errorCode === "401") {
          navigate("/Login");
          console.log("401");
        } else {
          alert("입력 실패!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    navigate("/board");
  };

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
                  <Form.Select style={{ width: "300px" }} defaultValue="자유">
                    <option>자유</option>
                    <option>Q&A</option>
                    <option>맛집&이색 카페</option>
                    <option>여행 정보</option>
                    <option>여행 동행</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>제목</Form.Label>
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
                  <Form.Label>내용</Form.Label>
                  <Form.Control
                    name="content"
                    as="textarea"
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
                  onClick={handleInsert}
                >
                  작성
                </Button>
                <Button
                  id="btn-cancel"
                  variant="danger"
                  type="cancel"
                  style={{ width: "150px" }}
                  onClick={handleCancel}
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

export default FormComm;

// const baseUrl = "http://localhost";
// const [posts, setPosts] = useState([]);

// useEffect(() => {
//   axios({
//     method: "GET",
//     url: baseUrl + "/web/boards",
//     withCredentials: true,
//   })
//     .then((response) => {
//       setPosts(response.data);
//       // console.log(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }, []);
