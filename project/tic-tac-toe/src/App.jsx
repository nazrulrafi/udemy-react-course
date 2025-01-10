import Player from "./Component/Player.jsx";
import GameBoard from "./Component/GameBoard.jsx";
import {useState} from "react";
import Logs from "./Component/Logs.jsx";
import {WINNING_COMBINATIONS} from "./winning-combination.js";
import GameOver from "./Component/GameOver.jsx";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveActivePlayer(prevTurns){
  let currentPlayer = "X";
  if(prevTurns.length > 0 && prevTurns[0].player === "X" ){
    currentPlayer = "0";
  }
  return currentPlayer
}
function App() {
  const [players,setPlayers] = useState({
    X:"Player 1",
    0:"Player 2",
  })
  //const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = [...initialGameBoard.map(array =>[...array])];
  for (const turn of gameTurns) {
    const {square,player} = turn;
    const {row,col} = square;
    gameBoard[row][col] = player
  }

  let winner = null;
  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol= gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol= gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol= gameBoard[combination[2].row][combination[2].column];
    if (firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol]
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner
  function handleSelectSquare(rowInd,colInd){
    //setActivePlayer((currentActivePlayer)=> currentActivePlayer === "X" ? "0" : "X");
    setGameTurns((prevTurns)=>{
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updateTurns = [{square:{row:rowInd,col:colInd},player:currentPlayer},...prevTurns];
      return updateTurns
    })
  }

  function handleRematch(){
    setGameTurns([])
  }

  function handlePlayerSetName(symbol,player){
    setPlayers((prevPlayers)=>{
      return {
        ...prevPlayers,
        [symbol]:player
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={players.X} symbol="X" isActive={activePlayer==="X"} onChangeName={handlePlayerSetName}/>
          <Player initialName={players["0"]} symbol="0" isActive={activePlayer==="0"} onChangeName={handlePlayerSetName}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch}/>}
        <GameBoard
            board={gameBoard}
            onSelectSquare={handleSelectSquare}
        />
      </div>
      <Logs turns={gameTurns}/>
    </main>
  )
}

export default App
