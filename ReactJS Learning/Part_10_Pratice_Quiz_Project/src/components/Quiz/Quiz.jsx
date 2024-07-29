import { useState, useCallback } from "react";
import QUESTIONS from "../../Data/questions.js";
import Question from "./Question.jsx";
import { QuizSummary } from "./QuizSummary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex == QUESTIONS.length;
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  /* 
    Function Reference Changes:
    In JavaScript, functions are objects, and their reference can change between renders. If handleSelectAnswer were to 
    change between renders, and you didn't include it in the dependency array, handleSkipAnswer would not be updated with 
    the new reference, potentially causing bugs.

  */
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return <QuizSummary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
