import "./Chat.css";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { URL_REGEX } from "../constants/contants";
export const Chat = ({ question, answer }) => {
  const config = {
    ALLOWED_ATTR: ["href", "target"],
  };

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const answerArrays = answer.split("");
  useEffect(() => {
    if (index < answerArrays.length) {
      setTimeout(() => {
        setText(text + answerArrays[index]);
        setIndex(index + 1);
        //adjustScroll();
      }, 5);
    }
   // const newText = text.replace(URL_REGEX, '<a href="$1" target="_blank">$1</a>');
   const newText = text.replace(URL_REGEX, '<a href="$1" target="_blank">$1</a>');
      // if (answerArrays.length && index == answerArrays.length) {
      //   onFinishedResponse();
      // }
    setText(newText);
  }, [index]);

  return (
    <>
      <div className="alert bg-primary text-white messageBox sender" role="alert">
        {question}
      </div>
      <div className="alert alert-light messageBox receiver" role="alert">
        {parse(DOMPurify.sanitize(text, config))}
      </div>
    </>
  );
};
