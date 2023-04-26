import axios from "axios";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./view.css";
import CommentForm from "../components/comment/DefaultComment";
import CommentsList from "../components/comment/CommentsList";

const View = (props) => {
  const baseUrl = "http://localhost";
  const { no } = useParams();
  const [image, setImage] = useState("./img/heart.png");
  const [content, setContent] = useState({ data: null });
  const [comments, setComments] = useState([]);
  const { user, setUser } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const prevNoRef = useRef(null);
  const [reComments, setReComments] = useState([]);

  const [likeCnt, setLikeCnt] = useState();
  const [prevImage, setPrevImage] = useState("");

  // 게시글에 대한 기본 정보
  useEffect(() => {
    if (prevNoRef.current !== no) {
      axios({
        method: "GET",
        url: `${baseUrl}/web/boards/${no}`,
        cache: true,
        withCredentials: true,
      })
        .then((response) => {
          setContent(response.data);
          // setLikes(response.data.data.likes);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error);
        });

      axios({
        method: "GET",
        url: `${baseUrl}/web/replys/${no}`,
        cache: true,
        withCredentials: true,
      })
        .then((response) => {
          let allReComments = []; // 모든 자식 댓글을 저장할 배열

          // response.data의 객체들을 순회하며 각 객체의 reComments 프로퍼티를 추출하여 allReComments 배열에 추가
          response.data.forEach((comment) => {
            allReComments = allReComments.concat(comment.reComments);
          });
          setComments(response.data);
          setReComments(allReComments);
        })
        .catch((error) => {
          setError(error);
        });

      axios({
        method: "GET",
        url: `${baseUrl}/web/like/cnt/${no}`,
      })
        .then((response) => {
          setLikeCnt(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });

      prevNoRef.current = no; // 현재 no를 이전 no로 저장합니다.
    } else {
      setIsLoading(false); // 현재 no와 이전 no가 동일하다면 로딩을 종료합니다.
    }
  }, [no]);

  // 이미지 파일 URL 생성 함수
  const getImageUrl = (filepath) => {
    // console.log(filepath);
    return `http://qocrfenoqdxa16854260.cdn.ntruss.com/board/${filepath.substr(
      filepath.lastIndexOf("/") + 1
    )}?type=m&w=1280&h=720&ttype=jpg`;
  };

  // 로그인 정보
  useEffect(() => {
    axios({
      method: "GET",
      url: `${baseUrl}/web/auth/user`,
      withCredentials: true,
    })
      .then((response) => {
        // console.log(response.data);
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, []);

  // 좋아요
  axios
    .get("http://localhost/web/like/" + no)
    .then((response) => {
      const result = response.data;
      const data = result.data;
      // console.log(result.data);
      if (data === "false") {
        // 좋아요를 누르지 않은 상태
        setImage("img/heart.png");
      } else if (data === "true") {
        // 이미 좋아요를 누른 상태
        setImage("img/colorheart.png");
      }
      // console.log(result);
    })
    .catch((exception) => {
      alert("입력 오류!");
      console.log(exception);
    });

  // 추천 및 추천 취소
  function handleClick() {
    if (image === "img/heart.png") {
      axios
        .post(
          "http://localhost/web/like",
          {},
          {
            params: {
              boardNo: no,
              memberNo: user.data.no,
            },
          }
        )
        .then((response) => {
          console.log(response);
          return response;
        })
        .then((result) => {
          if (result.status == "200") {
          } else if (result.errorCode == "401") {
          } else {
            alert("입력 실패!");
          }
        })
        .catch((exception) => {
          alert("입력 오류!");
          console.log(exception);
        });

      setPrevImage("img/heart.png");
      setImage("img/colorheart.png");
      window.location.reload();
    } else {
      axios
        .post(
          "http://localhost/web/like/delete",
          {},
          {
            params: {
              boardNo: no,
              memberNo: user.data.no,
            },
          }
        )
        .then((response) => {
          return response;
        })
        .then((result) => {
          if (result.status == "200") {
            console.log(result);
          } else if (result.errorCode == "401") {
          } else {
            alert("입력 실패!");
          }
        })
        .catch((exception) => {
          alert("입력 오류!");
          console.log(exception);
        });

      setImage(prevImage);
      setPrevImage("");
      window.location.reload();
    }
  }

  // 여기까지

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

  console.log(
    "recomments",
    comments.map((reComments) => {
      console.log("comment", reComments);
    })
  );

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
                  {content.data?.writer.nickname}
                </span>
                <span className="view-content-date">
                  {content.data?.createdDate}
                </span>
              </div>
              <div className="view-content-etc">
                <span className="view-content-count">
                  조회 {content.data?.viewCount}
                </span>
                <span className="view-content-reply">
                  {/* 댓글 {totalComments()} */}
                </span>
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
              <div className="view-content-like">
                <div className="view-content-like-main">
                  <button className="tttttt" onClick={handleClick}>
                    <img src={image} alt="image" />
                  </button>

                  <div className="likeCntText">{likeCnt}</div>
                  <p>개의 추천</p>
                </div>
              </div>
            </div>
          </div>

          {user.data &&
          content.data &&
          user.data.no === content.data.writer.no ? (
            <div className="view-content-bottom">
              <button onClick={handleDelete}>삭제</button>
              <Link to={`/FormUpdate/${content.data?.no}`}>
                <button>수정</button>
              </Link>
              <button onClick={handleBoard}>목록</button>
            </div>
          ) : (
            <div className="view-content-bottom">
              <button onClick={handleBoard}>목록</button>
            </div>
          )}
          <div className="view-comment-head">댓글</div>
          <CommentsList
            contentNo={content.data?.no}
            comments={comments}
            user={user.data}
            no={no}
          />
          <CommentForm
            content={content}
            setComments={setComments}
            no={no}
            user={user}
          />
        </header>
      </section>
    </div>
  );
};

export default View;
