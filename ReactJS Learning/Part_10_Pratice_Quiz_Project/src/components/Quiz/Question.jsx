import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers.jsx";
import { useState } from "react";
import QUESTIONS from "../../Data/questions.js";

//export default function Question({ key, onSelectAnswer, onSkipAnswer }) {
/*
  * If we use "key prop" in custom components as we passed it from parent component. Application crashes we can see errror in
    Dev tools. Reason is:
    * key prop that's exclusively used by React and exclusively reserved for React, and must not be used in our components 
      as prop.
    * Therefore, we should pick our own prop any name of your choice.
*/
export default function Question({
  questionIndex,
  onSelectAnswer,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({ selectedAnswer: "", isCorrect: null });
  //console.log('answer State',answer);
  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[questionIndex].answers[0] === answer,
      });

      // Nested timers here which will only start after above 1 millisecond timer expired.
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000); //Time is 1s written in milliseconds
  }

  let answerState = "";
  /*
     If isCorrect is null, that means that we might have a selectedAnswer, but we don't wanna show the result yet
     because we deliberately set isCorrect to null here when we log in an answer.
  */
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      {/*
            We have seen a problem that once timer is depleted progress bar not reset. Well, because this QuestionTimer 
            component doesn't get recreated.
            
            But therefore, of course this JSX code just gets updated once userAnswer state gets updated. QuestionTimer 
            component is not being recreated because it hasn't changed. It was part of the DOM before. It is still part of the DOM now.

            Therefore the timers and intervals in the QuestionTimer component are not reset.
            
            It should reset when the question changed. And there is a simple yet very powerful trick you can use in React 
            to achieve this. You can add a "key prop" to the QuestionTimer component, because this key prop can actually be 
            added to any element and any component, because key is a built-in prop React is looking for.

            In this case whenever activeQuestionIndex value changes. React will destroy the old component instance and create 
            a new one.
            So, it will unmount and remount it basically. And that's exactly what we need here, because we wanna recreate the 
            QuestionTimer component whenever we switch to a new question.

            We got the scenario where we need to unmount and mount Answers component. So, by using same "key prop" for Answers
            component we got a error in developer tools saying "two children with same key".

            Using the "same key activeQuestionIndex", on two different components(QuestionTimer, Answers). And that is not 
            something allowed to do. Yes, we have different types of components, but both components are siblings to each other
            inside the same div, and were using the same key.
           
            we could create yet another component. That is what we just did we kep both componets under one component
            and this Question component is outsourced in Quiz component and we can utilize key prop to make React recreate 
            the Question component

        */}

      <QuestionTimer
      key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[questionIndex].text}</h2>
      <Answers
        answers={QUESTIONS[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
