import "./form.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
// import "bootstrap/dist/css/bootstrap.min.css";

const DefaultForm = () => {
  return (
    <div className="form-body">
      <div className="wrapper">
        <div className="form-box">
          <h2>글쓰기</h2>
          <div className="form-box-input-form">
            <div className="form-box-input-box" id="test">
              <span className="inputBoxIcon"></span>
            </div>

            <Link to="/FormComm">
              <div className="form-box-input-box2">
                <span className="inputBoxIcon"></span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultForm;
