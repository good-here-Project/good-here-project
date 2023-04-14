import axios from "axios";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./view.css";

const View = () => {
  const baseUrl = "http://localhost";
  const { no } = useParams();
  const [content, setContent] = useState({ data: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const prevNoRef = useRef(null);

  const handleDelete = () => {
    axios({
      method: "DELETE",
      url: `${baseUrl}/web/boards/${no}`,
      withCredentials: true,
    })
      .then(() => {
        // 삭제 요청이 성공하면 목록 페이지로 이동합니다.
        navigate("/board");
      })
      .catch((error) => {
        setError(error);
      });
  };

  // 이미지 파일 URL 생성 함수
  const getImageUrl = (filepath) => {
    // console.log(filepath);
    return `http://htqaklgqrvoj16814214.cdn.ntruss.com/board/${filepath.substr(
      filepath.lastIndexOf("/") + 1
    )}?type=m&w=1280&h=720&ttype=jpg`;
  };

  useEffect(() => {
    if (prevNoRef.current !== no) {
      // 현재 no와 이전 no가 다를 경우에만 API 요청을 보냅니다.
      axios({
        method: "GET",
        url: `${baseUrl}/web/boards/${no}`,
        cache: true,
        withCredentials: true,
      })
        .then((response) => {
          console.log(response.data);
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

  // console.log(content);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleBoard = () => {
    navigate("/board");
  };

  const boardTypeValue = () => {
    switch (content.data?.boardTypeId) {
      case 1:
        return "자유";
      case 2:
        return "Q & A";
      case 3:
        return "맛집&이색카페";
      case 4:
        return "여행 정보";
      case 5:
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
                {content.data?.attachedFiles &&
                  content.data.attachedFiles.map((file) => {
                    if (file.filepath !== null) {
                      return (
                        <div key={file.no}>
                          <img
                            src={getImageUrl(file.filepath)}
                            alt={file.originalFilename}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                <div
                  dangerouslySetInnerHTML={{ __html: content.data?.content }}
                />
              </div>
            </div>
          </div>
          <div className="view-content-bottom">
            <button onClick={handleDelete}>삭제</button>
            <Link to={`/FormUpdate/${content.data?.no}`}>
              <button>수정</button>
            </Link>
            <button onClick={handleBoard}>목록</button>
          </div>
          <div className="view-comment-list"></div>
          <div className="view-comment-main">
            <div className="view-comment-nickname">닉네임</div>
            <textarea
              className="view-comment-content"
              placeholder="댓글을 남겨보세요"
            ></textarea>
            <button className="view-comment-insert">등록</button>
          </div>
        </header>
      </section>
    </div>
  );
};

export default View;
