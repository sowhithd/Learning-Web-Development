import Input from "../Input/Input";

export default function UserInput({ onChangeInput, investment }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <Input
          feildName="initialInvestment"
          feildType="number"
          onChange={(event) =>
            onChangeInput("initialInvestment", event.target.value)
          }
          value={investment.initialInvestment}
        />
        <Input
          feildName="annualInvestment"
          feildType="number"
          onChange={(event) =>
            onChangeInput("annualInvestment", event.target.value)
          }
          value={investment.annualInvestment}
        />
        <Input
          feildName="expectedReturn"
          feildType="number"
          onChange={(event) =>
            onChangeInput("expectedReturn", event.target.value)
          }
          value={investment.expectedReturn}
        />
        <Input
          feildName="duration"
          feildType="number"
          onChange={(event) => onChangeInput("duration", event.target.value)}
          value={investment.duration}
        />

        {/*
        <p>
          <label htmlFor="initialInvestment">Initial Investement</label>
          <input
            type="number"
            name="initialInvestment"
            onChange={(event) =>
              onChangeInput("initialInvestment", event.target.value)
            }
            value={investment.initialInvestment}
            required
          />
        </p>
        <p>
          <label htmlFor="annualInvestment">Annual Investement</label>
          <input
            type="number"
            name="annualInvestment"
            onChange={(event) =>
              onChangeInput("annualInvestment", event.target.value)
            }
            value={investment.annualInvestment}
            required
          />
        </p>
        <p>
          <label htmlFor="expectedReturn">Expected Return</label>
          <input
            type="number"
            name="expectedReturn"
            onChange={(event) => onChangeInput("expectedReturn", event.target.value)}
            value={investment.expectedReturn}
            required
          />
        </p>
        <p>
          <label htmlFor="duration">Duration</label>
          <input
            type="number"
            name="duration"
            onChange={(event) => onChangeInput("duration", event.target.value)}
            value={investment.duration}
            required
          />
        </p>

        */}
      </div>
    </section>
  );
}
