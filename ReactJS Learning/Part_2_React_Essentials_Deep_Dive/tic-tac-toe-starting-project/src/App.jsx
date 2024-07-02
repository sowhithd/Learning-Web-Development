import { useState } from "react";
import { WINNING_COMBINATIONS } from "./data/winning-combinations.js";
import GameBoard from "./components/GameBoard/GameBoard";
import Player from "./components/Player/Player";
import Log from "./components/LogComponent/Log";
import GameOver from "./components/GameOver/GameOver.jsx";

const PLAYERS = {
  X:'Player 1',
  O:'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

/*
  Helper function:
  This function not need access to state or any data related to the component. 
  And it also shouldn't be recreated when the component function reexecutes
  of any stage update triggers.
*/
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  //This first index data will be the lastest record of player selected symbol.
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function derivedWinner(gameBoard, players){
  
  let winner = undefined;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      //It is a strandrad  JAVAscript syntax for dynamically accessing the property, where   
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function derivedGameBoard(gameTurns){
  
  /*
    Below what we are doing is  we are not managing the state, instead what we are doing here is call "derving State"
    We are producing some derived state, some computed value you could say, Gameboard is a computed value
    that is derived from some state.

    In this case, from the game turns state that is managed in the app component. 
     
    We are deriving the gameboard from that state. And this is how you should think and work in React. You should manage as little 
    state as needed and try to derive as much information and as many values as possible from that state.

    With this, meaning by cloning array we make sure that we added a brand new array when we derive the gameBoard and not that 
    original initial array in memory.
  */
  
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray=>[...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  //Currently this state is called as "Lifting State UP". This state is being used in both Player and Gameboard component
  const [gameTurns, setGameTurns] = useState([]);
  const [players,setPlayers] = useState(PLAYERS);
  
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = derivedGameBoard(gameTurns);
  
  const winner = derivedWinner(gameBoard,players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, columnIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updateTurns = [
        { square: { row: rowIndex, col: columnIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updateTurns;
    });
  }
  
  function handleRestart() {
      setGameTurns([]);
  }

  function handlePlayerNameChange(playerSymbol, newName) {
    setPlayers(previousPlayers => {
      return{
      ...previousPlayers,
      [playerSymbol]:newName
      }
    });
    
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialPlayerName={PLAYERS.X}
            playerSymbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialPlayerName={PLAYERS.O}
            playerSymbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
