import { useEffect, useState, useRef } from "react";

export function Question({ questions, onReset }) {
  const [question, setQuestion] = useState("");
  const [shuffledAnswers, setShuffledAnswers] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [result, setResult] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const buttonRef = useRef(null);
  const bad =
    "Looks like someone needs to hit the books a bit harder! Don't worry, even Einstein had his off days.";
  const mid =
    "You're not quite a trivia master yet, but hey, you're getting there! Keep up the good work, future quiz champion!";
  const good =
    "Well, well, well! It seems we have a trivia genius in our midst! Time to put that brainpower to good use and dominate the next quiz night!";

  function shuffleList(shuffledList) {
    for (let i = shuffledList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generating randon index
      [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]]; // Switch position i and j
    }
    return shuffledList;
  }

  function handleNextQuestion() {
    let question = questions[currentIndex].question;
    setQuestion(question);

    let answers = [
      ...questions[currentIndex].incorrect_answers,
      questions[currentIndex].correct_answer,
    ];

    let shuffledAnswers = shuffleList(answers);
    setShuffledAnswers(shuffledAnswers);

    console.log("handleNextQuestion", currentIndex);
  }

  useEffect(() => {
    handleNextQuestion();
  }, [currentIndex]);

  function handleNextQuestionButtonClick() {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    console.log("handleNextQuestionButtonClick", currentIndex);
  }

  function handleAnswerChange(answer) {
    setSelectedAnswer(answer);

    if (answer === questions[currentIndex].correct_answer) {
      setRightAnswer((prevCount) => prevCount + 1);
    }
  }

  function handleSubmit() {
    setResult(rightAnswer);
    buttonRef.current.hidden = true;
    setIsFinished(true);
  }

  return (
    <div className="container">
      <form className="form">
        <div className="question">
          {!isFinished && question && (
            <h3 className="question-text">
              {currentIndex + 1}. {question}
            </h3>
          )}
          {!isFinished && shuffledAnswers && (
            <ul className="answers">
              {shuffledAnswers.map((answer, index) => (
                <div className="answer-text" key={index}>
                  <input
                    type="radio"
                    style={{ marginRight: "10%" }}
                    id={`answer${index}`}
                    name="answers"
                    value={answer}
                    checked={selectedAnswer === answer}
                    onChange={() => handleAnswerChange(answer)}
                  />
                  <label htmlFor={`answer${index}`}>{answer}</label>
                </div>
              ))}
            </ul>
          )}
        </div>
        {currentIndex === questions.length - 1 ? (
          <button
            className="question-button"
            type="button"
            ref={buttonRef}
            onClick={handleSubmit}
          >
            Find out result
          </button>
        ) : (
          <button
            className="question-button"
            type="button"
            onClick={handleNextQuestionButtonClick}
            disabled={!selectedAnswer}
          >
            Next
          </button>
        )}
      </form>
      {isFinished && (
        <div className="results">
          {result !== null && (
            <h4 className="result-text">Your final result is {result}</h4>
          )}
          {result <= 3 && <p className="description">{bad}</p>}
          {4 <= result && result <= 7 && <p className="description"> {mid}</p>}
          {result > 7 && <p className="description">{good}</p>}
          {
            <button className="again-button" type="button" onClick={onReset}>
              Try again
            </button>
          }
        </div>
      )}
    </div>
  );
}
