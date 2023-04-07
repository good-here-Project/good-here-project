import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./view.css";

const View = () => {
  const baseUrl = "http://localhost";
  const { no } = useParams();
  const [content, setContent] = useState({ data: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevNoRef = useRef(null);

  useEffect(() => {
    if (prevNoRef.current !== no) {
      // 현재 no와 이전 no가 다를 경우에만 API 요청을 보냅니다.
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
      prevNoRef.current = no; // 현재 no를 이전 no로 저장합니다.
    } else {
      setIsLoading(false); // 현재 no와 이전 no가 동일하다면 로딩을 종료합니다.
    }
  }, [no]);

  //   console.log(content.data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const boardTypeValue = () => {
    switch (content.data?.boardTypeId) {
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
