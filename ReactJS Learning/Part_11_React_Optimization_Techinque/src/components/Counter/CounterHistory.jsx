import { useState } from "react";

import { log } from "../../log.js";

function HistoryItem({ count, operation }) {
  log("<HistoryItem /> rendered", 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} className={selected ? "selected" : undefined}>
     { operation !== '' && <> <span style={{ color: operation === "addition" ? "green" : "red" }}>
        {operation === "addition" ? "Increment By:" : "Decrement By:"}
      </span> 
      {count} </>}
    </li>
  );
}

export default function CounterHistory({ history }) {
  log("<CounterHistory /> rendered", 2);

  return (
    <ol>
      {history.map((count, index) => (
        <HistoryItem
          key={count.id}
          count={count.value}
          operation={count.mathOperation}
        />
      ))}
    </ol>
  );
}
