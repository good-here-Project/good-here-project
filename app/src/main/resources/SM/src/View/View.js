import axios from "axios";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./view.css";

const View = (props) => {
  const baseUrl = "http://localhost";
  const { no } = useParams();
  const [content, setContent] = useState({ data: null });
  const [comments, setComments] = useState([]);
  // const [parentComments, setParentComments] = useState([]);
  const [enteredContent, setEnteredContent] = useState("");
  // const [user, setUser] = useState(null);
  const { user, setUser } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const prevNoRef = useRef(null);
  const commentInputRef = useRef();
  const [editingComment, setEditingComment] = useState(null);
  const [editingReComment, setEditingReComment] = useState(null);
  const [reComments, setReComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(null);

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
      axios({
        method: "GET",
        url: `${baseUrl}/web/boards/${no}`,
        cache: true,
        withCredentials: true,
      })
        .then((response) => {
          console.log("리스폰 데이터");
          console.log(response.data.data.likes);
          setContent(response.data);
          setLikes(response.data.data.likes);
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

          console.log("----------");
          // console.log(response.data?.reComments);
          setComments(response.data);
          // setParentComments(response.data);
          setReComments(allReComments);
          console.log("성공");
        })
        .catch((error) => {
          setError(error);
        });

      prevNoRef.current = no; // 현재 no를 이전 no로 저장합니다.
    } else {
      setIsLoading(false); // 현재 no와 이전 no가 동일하다면 로딩을 종료합니다.
    }
  }, [no]);

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

  const handleChange = (event) => {
    setEnteredContent(event.target.value);

    console.log(setEnteredContent);
  };

  const handleComment = () => {
    axios({
      method: "POST",
      url: baseUrl + `/web/replys`,
      params: {
        boardNo: content.data.no,
        content: enteredContent,
      },
      withCredentials: true,
    })
      .then((response) => {
        setEnteredContent("");
        axios({
          method: "GET",
          url: `${baseUrl}/web/replys/${no}`,
          cache: true,
          withCredentials: true,
        })
          .then((response) => {
            console.log(response.data);
            setComments(response.data);
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        console.log(error); // 요청이 실패하면 에러를 출력
      });
  };

  // 댓글 수정
  const handleUpdateComment = (id) => {
    console.log("댓글 수정 클릭 ");
    axios({
      method: "PUT",
      url: `${baseUrl}/web/replys/${id}`,
      withCredentials: true,
      params: {
        content: editingComment.content,
      },
    })
      .then((response) => {
        // 댓글 업데이트 성공 시, comments 배열에서 해당 댓글을 찾아 업데이트한다.
        console.log("댓글 수정 성공");
        const updatedComments = comments.map((comment) => {
          if (comment.no === id) {
            // 해당 댓글을 찾으면 업데이트한다.
            return { ...comment, content: editingComment.content };
          }
          return comment; // 해당 댓글이 아니면 그대로 반환한다.
        });
        setComments(updatedComments); // 변경된 comments 배열을 설정한다.
        setEditingComment(null); // editingComment를 초기화한다.
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleUpdateReComment = (no) => {
    console.log(no);
    console.log(editingReComment.content);

    axios({
      method: "PUT",
      url: `${baseUrl}/web/replys/child/${no}`,
      withCredentials: true,
      params: {
        content: editingReComment.content,
      },
    })
      .then((response) => {
        // 댓글 업데이트 성공 시, comments 배열에서 해당 댓글을 찾아 업데이트한다.
        console.log("대댓글 수정 성공");
        const updatedComments = reComments.map((recomment) => {
          if (recomment.no === no) {
            // 해당 댓글을 찾으면 업데이트한다.
            return { ...recomment, content: editingReComment.content };
          }
          return recomment; // 해당 댓글이 아니면 그대로 반환한다.
        });
        setReComments(updatedComments); // 변경된 comments 배열을 설정한다.
        setEditingReComment(null); // editingComment를 초기화한다.
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleDeleteComment = (id) => {
    axios({
      method: "DELETE",
      url: `${baseUrl}/web/replys/${id}`,
      withCredentials: true,
    })
      .then(() => {
        console.log("success");
        const updatedComments = comments.filter((comment) => comment.no !== id);
        setComments(updatedComments);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleReComment = () => {
    // 부모 댓글 no
    console.log(editingReComment.no);
    console.log(user.data.nickname);

    axios({
      method: "POST",
      url: baseUrl + `/web/replys/child`,
      params: {
        parentCommentNo: editingReComment.no,
        content: editingReComment.content,
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log("대댓글 성공");
        console.log(response);
        axios({
          method: "GET",
          url: `${baseUrl}/web/replys/${no}`,
          cache: true,
          withCredentials: true,
        })
          .then((response) => {
            setEditingReComment(null);
            let allReComments = []; // 모든 자식 댓글을 저장할 배열

            // response.data의 객체들을 순회하며 각 객체의 reComments 프로퍼티를 추출하여 allReComments 배열에 추가
            response.data.forEach((comment) => {
              allReComments = allReComments.concat(comment.reComments);
            });

            console.log("----------");
            // console.log(response.data?.reComments);
            setComments(response.data);
            // setParentComments(response.data);
            setReComments(allReComments);
            console.log("성공");
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteReComment = (no) => {
    console.log(no);
    axios({
      method: "DELETE",
      url: `${baseUrl}/web/replys/child/${no}`,
      withCredentials: true,
    })
      .then(() => {
        console.log("success");
        const updatedComments = reComments.filter(
          (recomment) => recomment.no !== no
        );
        console.log(updatedComments);
        setReComments(updatedComments);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleLike = () => {
    // console.log(content.data.no);
    // console.log(user.data.no);
    if (user.data.no === null) navigate("/Login");

    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
      axios({
        method: "POST",
        url: `${baseUrl}/web/like/delete`,
        withCredentials: true,
        params: {
          boardNo: content.data.no,
          memberNo: user.data.no,
        },
      })
        .then((response) => {
          console.log("추천 취소 성공");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLiked(true);
      setLikes(likes + 1);
      axios({
        method: "POST",
        url: `${baseUrl}/web/like`,
        withCredentials: true,
        params: {
          boardNo: content.data.no,
          memberNo: user.data.no,
        },
      })
        .then((response) => {
          console.log("추천 성공");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  console.log(likes);
  console.log(user.data);
  const totalComments = () => {
    return comments.length + reComments.length;
  };

  console.log(content.data);

  const loginComment = (user) => {
    if (user !== null) {
      return user;
    }
    navigate("/Login");
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
                  댓글 {totalComments()}
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
                  <a onClick={handleLike}>{liked ? "💔" : "🖤"}</a>
                  {likes}
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

          <div className="view-comment-list">
            {comments.map((comment) => (
              <div key={comment.no} className="comment" comment={comment}>
                {editingComment && editingComment.no === comment.no ? (
                  <div className="comment-reply">
                    <div className="comment-profile">
                      <span className="comment-profile-nickname">
                        {user.data.nickname}
                      </span>
                    </div>
                    <textarea
                      className="comment-reply-text"
                      defaultValue={""}
                      onChange={(e) =>
                        setEditingComment({
                          ...editingComment,
                          content: e.target.value,
                        })
                      }
                    />
                    <div className="comment-reply-btns">
                      <button
                        className="comment-reply-cancel-btn"
                        type="button"
                        onClick={() => setEditingComment(null)}
                      >
                        취소
                      </button>
                      <button
                        className="comment-reply-btn"
                        type="button"
                        onClick={() => handleUpdateComment(comment.no)}
                      >
                        변경
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="comment-profile">
                      <span className="comment-profile-nickname">
                        {comment.writer.nickname}
                      </span>
                      <span className="comment-profile-date">
                        {comment.createdDate}
                      </span>
                    </div>
                    <div className="comment-content">{comment.content}</div>
                    {user.data &&
                    comment.writer &&
                    user.data.no === comment.writer.no ? (
                      <div className="btns">
                        <button
                          className="comment-btn_delete"
                          onClick={() => handleDeleteComment(comment.no)}
                        >
                          삭제
                        </button>
                        <button
                          className="comment-btn_update"
                          onClick={() => setEditingComment(comment)}
                        >
                          수정
                        </button>
                        <button
                          className="comment-btn_re-comment"
                          onClick={() => setEditingReComment(comment)}
                        >
                          답글
                        </button>
                      </div>
                    ) : (
                      <div className="btns">
                        <button
                          className="comment-btn_re-comment"
                          onClick={() => {
                            if (user.data === null) {
                              navigate("/Login");
                            }
                            setEditingReComment(comment);
                          }}
                        >
                          답글
                        </button>
                      </div>
                    )}
                    {editingReComment && editingReComment.no === comment.no ? (
                      // 답글 입력 폼
                      <div className="comment-reply">
                        <div className="comment-profile">
                          <span className="comment-profile-nickname">
                            {user.data.nickname}
                          </span>
                        </div>
                        <textarea
                          className="comment-reply-text"
                          defaultValue={""}
                          // value={editingReComment.content && ""}
                          onChange={(e) =>
                            setEditingReComment({
                              ...editingReComment,
                              content: e.target.value,
                            })
                          }
                        />
                        <div className="comment-reply-btns">
                          <button
                            className="comment-reply-cancel-btn"
                            type="button"
                            onClick={() => setEditingReComment(null)}
                          >
                            취소
                          </button>
                          <button
                            className="comment-reply-btn"
                            type="button"
                            onClick={() => handleReComment()}
                          >
                            등록
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {reComments &&
                      reComments
                        .filter((reComment) =>
                          comment.reComments.some(
                            (rec) => reComment.no === rec.no
                          )
                        )
                        .map((reComment) => (
                          <div
                            key={reComment.no}
                            className="re-comment"
                            reComment={reComment}
                          >
                            {editingReComment &&
                            editingReComment.no === reComment.no ? (
                              <div className="re-comment-update">
                                <form>
                                  <textarea
                                    defaultValue={reComment.content}
                                    onChange={(e) =>
                                      setEditingReComment({
                                        ...editingReComment,
                                        content: e.target.value,
                                      })
                                    }
                                    className="comment-update-textarea"
                                  />
                                  <button
                                    type="button"
                                    className="comment-update-btn"
                                    onClick={() => {
                                      handleUpdateReComment(reComment.no);
                                    }}
                                  >
                                    변경
                                  </button>
                                  <button
                                    type="button"
                                    className="comment-cancel-btn"
                                    onClick={() => setEditingReComment(null)}
                                  >
                                    취소
                                  </button>
                                </form>
                              </div>
                            ) : (
                              <>
                                <div className="comment-profile">
                                  <span className="comment-profile-nickname">
                                    {reComment.writer.nickname}
                                  </span>
                                  <span className="comment-profile-date">
                                    {reComment.createdDate}
                                  </span>
                                </div>
                                <div className="comment-content">
                                  {reComment.content}
                                </div>
                                {user.data &&
                                  user.data.no === reComment.writer.no && (
                                    <div className="re-btns">
                                      <button
                                        className="comment-btn_delete"
                                        onClick={() =>
                                          handleDeleteReComment(reComment.no)
                                        }
                                      >
                                        삭제
                                      </button>
                                      <button
                                        className="comment-btn_update"
                                        onClick={() =>
                                          setEditingReComment(reComment)
                                        }
                                      >
                                        수정
                                      </button>
                                    </div>
                                  )}
                              </>
                            )}
                          </div>
                        ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {user.data !== null ? (
            <div className="view-comment-main">
              <div className="view-comment-nickname">{user.data.nickname}</div>
              <textarea
                className="view-comment-content"
                ref={commentInputRef}
                value={enteredContent}
                onChange={handleChange}
                placeholder="댓글을 남겨보세요"
              ></textarea>
              <button
                className="view-comment-insert"
                type="button"
                onClick={handleComment}
              >
                등록
              </button>
            </div>
          ) : (
            <div className="view-comment-main">
              <div className="view-comment-nickname">
                로그인 후 이용 가능합니다
              </div>
              <textarea
                className="view-comment-content"
                placeholder="로그인후 댓글을 남겨보세요!"
                onClick={() => {
                  navigate("/Login");
                }}
                readOnly
              ></textarea>
            </div>
          )}
        </header>
      </section>
    </div>
  );
};

export default View;

// 병렬 요청
// useEffect(() => {
//   const fetchContent = axios.get(`${baseUrl}/web/boards/${no}`, {
//     cache: true,
//     withCredentials: true,
//   });

//   const fetchUser = axios.get(`${baseUrl}/web/users/current`, {
//     withCredentials: true,
//   });

//   Promise.all([fetchContent, fetchUser])
//     .then((responses) => {
//       const contentResponse = responses[0];
//       const userResponse = responses[1];
//       setContent(contentResponse.data);
//       setUser(userResponse.data);
//       setIsLoading(false);
//     })
//     .catch((error) => {
//       setIsLoading(false);
//       setError(error);
//     });
// }, [no]);

{
  /* <div className="comment-profile">
<img className="comment-profile-image" src={comment.writer.profileImageUrl} alt={comment.writer.nickname} /> */
}
