import { useState, useRef } from "react";
import { Question } from "./Question";
import he from "he";

export default function Quiz() {
  const [questions, setQuestions] = useState(null);
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  function getTriviaQuestions() {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((data) => {
        // Decode each individual question
        const decodedQuestions = data.results.map((question) => ({
          ...question,
          question: he.decode(question.question),
          // Decode incorrect answers if needed
          incorrect_answers: question.incorrect_answers.map((answer) =>
            he.decode(answer)
          ),
          // Decode correct answer if needed
          correct_answer: he.decode(question.correct_answer),
        }));
        setQuestions(decodedQuestions);
      })
      .catch((error) => {
        console.log("Error fetching trivia questions:", error);
      });
    buttonRef.current.hidden = true;
    textRef.current.hidden = true;
  }

  function handleReset(){
    setQuestions(null);
    getTriviaQuestions();
  }

  return (
    <div className="start">
      <p className="start-text" ref={textRef}>
        Are you ready to put your knowledge to the test and see how much you
        really know?
      </p>
      <button
        className="start-button"
        ref={buttonRef}
        onClick={getTriviaQuestions}
      >
        Start Quiz
      </button>
      {questions && <Question questions={questions} onReset = {handleReset}/>}
    </div>
  );
}
