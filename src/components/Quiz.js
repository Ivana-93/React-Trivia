import triviaData from "../triviaData";
import { useState, useRef } from "react";
import { Question } from "./Question";

export default function Quiz() {
  const [questions, setQuestions] = useState(null);
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  function getTriviaQuestions() {
    const triviaArray = triviaData.results;
    setQuestions(triviaArray);
    buttonRef.current.hidden = true;
    textRef.current.hidden = true;
  }

  return (
    <div className="start">
      <p className="start-text" ref={textRef}>
      Are you ready to put your knowledge to the test and see how much you really know? 
      </p>
      <button
        className="start-button"
        ref={buttonRef}
        onClick={getTriviaQuestions}
      >
        Start Quiz
      </button>
      {questions && <Question questions={questions} />}
    </div>
  );
}
