import React, {useState} from 'react';


function GameBoard({selectSquare,boards}) {
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);
    // function handleSelectSquare(rowInd,colInd){
    //     setGameBoard(prevGameBoard => {
    //         const newGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         newGameBoard[rowInd][colInd] = activePlayer
    //         return newGameBoard;
    //     });
    //     onSelectSquare()
    // }


    return (
        <ol id="game-board">
            {boards.map((row,rowInd)=>(
                <li key={rowInd}>
                    <ol>
                        {row.map((playerSymbol,colInd)=>(
                            <li key={colInd}>
                                <button disabled={playerSymbol !== null} onClick={()=>selectSquare(rowInd,colInd)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}

export default GameBoard;