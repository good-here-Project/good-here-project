import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./view.css";

const View = () => {
  const baseUrl = "http://localhost";
  const { no } = useParams();
  const [content, setContent] = useState({ data: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios({
      method: "GET",
      url: baseUrl + `/web/boards/${no}`,
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
  }, [no]);

  //   console.log(setContent);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  let boardTypeValue = () => {
    switch (content.data.boardTypeId) {
      case 0:
        return "자유";
      case 1:
        return "Q & A";
      case 2:
        return "맛집&이색카페";
      case 3:
        return "여행 정보";
      case 4:
        return "여행 동행";

      default:
        break;
    }
  };

  return (
    <div className="view-main">
      <section>
        <header>
          <div className="view-head-cate">{boardTypeValue()}</div>
          <div className="view-content-wrap">
            <div className="view-content-head">
              <h3 className="view-content-title">{content.data?.title}</h3>
              <div className="view-content-info">
                <span className="view-content-nickname">
                  {content.data?.nickname ?? "ㅇㅇ"}
                </span>
                <span className="view-content-date">
                  {content.data?.createdDate}
                </span>
              </div>
              <div className="view-content-etc">
                <span className="view-content-count">
                  조회 {content.data?.viewCount}
                </span>
                <span className="view-content-reply">추천 9</span>
              </div>
            </div>
            <div className="view-content-body">
              <div className="view-content-write">
                <p>{content.data?.content}</p>
              </div>
            </div>
          </div>
        </header>
      </section>
    </div>
  );
};

export default View;
