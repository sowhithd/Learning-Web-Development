import  quizlogo  from "../../assets/quiz-logo.png";
export default function Header() {
  return (
    <header>
      <img src={quizlogo} alt="React Quiz logo" />
      <h1>React Quiz</h1>
    </header>
  );
}
