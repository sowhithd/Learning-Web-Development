import Header from "../components/Header/Header";
import UserInput from "../components/UserInput/UserInput";
import Results from "../components/Results/Results";
import { useState } from "react";

const initialInvestmentObj = {
  initialInvestment: 10000,
  annualInvestment: 12000,
  expectedReturn: 6,
  duration: 12,
};

function App() {
  const [investment, setInvestment] = useState(initialInvestmentObj);

  const inputIsValid = investment.duration >= 1;
  function handleChange(inputIdentifier, newValue) {
    setInvestment((previousValue) => {
      return {
        ...previousValue,
        [inputIdentifier]: +newValue,
      };
    });
  }
  return (
    <>
      <Header />
      <UserInput onChangeInput={handleChange} investment={investment} />
      {!inputIsValid && (
        <p className="center">Please Enter Duration Greater Than Zero</p>
      )}
      {inputIsValid && <Results userInvestments={investment} />}
    </>
  );
}

export default App;
