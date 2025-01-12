

import {useState} from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {WINNING_COMBINATIONS} from "./winning-combination.js";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
const initialGameBoard = [
  [null, null, null,],
  [null, null, null,],
  [null, null, null,],
]

function deriveActivePlayer(gameTurns){
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X"){
    currentPlayer = "0";
  }
  return currentPlayer;
}


function App() {
  const [playerName, setPlayerName] = useState({
    X:"Player 1",
    0:"Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array =>[...array])];
  for (const turn of gameTurns){
    const {square,player} = turn;
    const {row,col} = square;
    gameBoard[row][col] = player;
  }

  let winner =null;
  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol= gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol= gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol= gameBoard[combination[2].row][combination[2].column];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = playerName[firstSquareSymbol];
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;
  function handleRematch(){
    setGameTurns([])
  }
  function handlePlayerNameChange(symbol,newName){
    setPlayerName(prevPlayers =>{
      return {...prevPlayers,[symbol]:newName}
    })
  }
  function handleSelectSquare(rowIndex,colIndex){
    setGameTurns((prevTurns)=>{
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updateTurns = [
        {
          square:{row:rowIndex,col:colIndex},
          player:currentPlayer
        },
          ...prevTurns
      ]
      return updateTurns;
    });
  }
  return (
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} onChangeName ={handlePlayerNameChange}/>
            <Player initialName="Player 2" symbol="0" isActive={activePlayer === "0"} onChangeName ={handlePlayerNameChange}/>
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch}/>}
          <GameBoard selectSquare={handleSelectSquare} boards={gameBoard}/>
        </div>
        <Log turns={gameTurns}/>
      </main>
  )
}

export default App
