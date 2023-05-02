// QuillEditor.js

import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";

function QuillEditor({ onChange }) {
  const editorRef = useRef(null);
  const [quill, setQuill] = useState(null);

  useEffect(() => {
    if (editorRef.current && !quill) {
      const newQuill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image"],
              ["clean"],
            ],
            handlers: {
              //   image: imageHandler,
            },
          },
        },
      });

      setQuill(newQuill);
    }
  }, [quill]);

  return <div ref={editorRef} />;
}

export default QuillEditor;
