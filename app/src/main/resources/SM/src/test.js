import React, { useCallback, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

function CreatePost() {
  const quillRef = useRef(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // 이미지 처리를 하는 핸들러
  const imageHandler = () => {
    console.log("에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!");

    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement("input");
    console.log("1");
    // 속성 써주기
    input.setAttribute("type", "files");
    input.setAttribute("accept", "image/*");
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
    // input이 클릭되면 파일 선택창이 나타난다.
    console.log(input);
    // input에 변화가 생긴다면 = 이미지를 선택
    input.addEventListener("change", async () => {
      console.log("온체인지");
      const file = input.files[0];
      // multer에 맞는 형식으로 데이터 만들어준다.
      const formData = new FormData();
      formData.append("img", file); // formData는 키-밸류 구조
      // 백엔드 multer라우터에 이미지를 보낸다.
      console.log("3");
      try {
        const result = await axios.post(
          "http://localhost/web/boards/",
          formData
        );
        console.log("성공 시, 백엔드가 보내주는 데이터", result.data.url);
        const IMG_URL = result.data.url;
        // 이 URL을 img 태그의 src에 넣은 요소를 현재 에디터의 커서에 넣어주면 에디터 내에서 이미지가 나타난다
        // src가 base64가 아닌 짧은 URL이기 때문에 데이터베이스에 에디터의 전체 글 내용을 저장할 수있게된다
        // 이미지는 꼭 로컬 백엔드 uploads 폴더가 아닌 다른 곳에 저장해 URL로 사용하면된다.

        // 이미지 태그를 에디터에 써주기 - 여러 방법이 있다.
        const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
        // 1. 에디터 root의 innerHTML을 수정해주기
        // editor의 root는 에디터 컨텐츠들이 담겨있다. 거기에 img태그를 추가해준다.
        // 이미지를 업로드하면 -> 멀터에서 이미지 경로 URL을 받아와 -> 이미지 요소로 만들어 에디터 안에 넣어준다.
        // editor.root.innerHTML =
        //   editor.root.innerHTML + `<img src=${IMG_URL} /><br/>`; // 현재 있는 내용들 뒤에 써줘야한다.

        // 2. 현재 에디터 커서 위치값을 가져온다
        const range = editor.getSelection();
        // 가져온 위치에 이미지를 삽입한다
        editor.insertEmbed(range.index, "image", IMG_URL);
      } catch (error) {
        console.log("실패했어요ㅠ");
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ align: [] }, "image"],
        ],
        handlers: {
          // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
          image: imageHandler,
        },
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

  console.log(title);
  console.log(category);
  console.log(content);

  return (
    {editingReComment && editingReComment.no === comment.no ? (
      // 대댓글 입력 폼
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
    ) : (
      <div className="btns">
        <button
          className="comment-btn_re-comment"
          onClick={() => setEditingReComment(comment)}
        >
          답글
        </button>
      </div>
    )}
    {reComments &&
      reComments.map((reComment) => (
        <div key={reComment.no} className="re-comment" comment={reComment}>
          <div className="comment-profile">
            <span className="comment-profile-nickname">
              {reComment.writer.nickname}
            </span>
            <span className="comment-profile-date">
              {reComment.createdDate}
            </span>
          </div>
          <div className="comment-content">{reComment.content}</div>
          {user.data && user.data.no === reComment.writer.no ? (
  <div className="btns">
    <button
      className="comment-btn_delete"
      onClick={() =>
        handleDeleteReComment(comment.no, reComment.no)
      }
    >
      삭제
    </button>
    <button
      className="comment-btn_update"
      onClick={() =>
        handleUpdateReComment(comment.no, reComment.no)
      }
    >
      수정
    </button>
  </div>
) : null}

  );
}

export default CreatePost;
