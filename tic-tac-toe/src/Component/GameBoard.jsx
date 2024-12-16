import {useState} from "react";

export default function GameBoard({onSelectSquare,board}) {
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);
    // function handleSelectSquare(rowInd,colInd){
    //     setGameBoard((prevGameBoard)=>{
    //         const updatedGameBoard = [...prevGameBoard.map(innerArray=>[...innerArray])];
    //         updatedGameBoard[rowInd][colInd]= activePlayerSymbol;
    //         return updatedGameBoard;
    //     })
    //     onSelectSquare()
    // }

    return (
        <ol id="game-board">
            {board.map((row,rowInd) => (
                <li key={rowInd}>
                    <ol>
                        {row.map((cell,colInd) => (
                            <li key={colInd}><button disabled={cell !== null} onClick={()=>onSelectSquare(rowInd,colInd)}>{cell}</button></li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}