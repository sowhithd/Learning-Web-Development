export default function GameBoard({onSelectSquare,board}) {
 
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSelectedSymbol, columnIndex) => (
              <li key={columnIndex}>
                <button onClick={() => onSelectSquare(rowIndex,columnIndex)} disabled={playerSelectedSymbol !== null}>{playerSelectedSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
