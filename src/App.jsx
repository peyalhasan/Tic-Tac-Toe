
/**
 *     Game
 *      -> Board
 *          -> Square
 *      -> History
 * 
 */

import { useState } from "react"


function Square({ value, onSquareClick }) {

  return (
    <button onClick={onSquareClick} className=" bg-white border border-gray-400 h-25 w-25 m-1 leading-9 text-lg " >{value}</button>
  )
}

export function Board({squares, xIsNext, onPlay}) {


  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    status = `Winner: ${winner} `;
  }
  else {
    status = "Next Player: " + (xIsNext ? "X" : "O")
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = "X"
    }
    else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares)
  }

  return (
    <>
      <div className="text-white">
        {status}
      </div>
      <div className="flex text-black" >
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="flex text-black">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="flex text-black">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}


export default function Game() {
  
  // for changing array value
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0)
  
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(move){
    setCurrentMove(move)
    setXIsNext(move % 2 === 0);
  }

  const moves = history.map((squares, move) =>{
    let description;
    if(move > 0){
      description = `Go to the move # ${move}`
    }
    else{
      description = `Go to start the game`;
    }
    return(
      <li key={move}>
        <button onClick={()=> jumpTo(move)} >{description}</button>
      </li>
    )
  })

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-white">
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} ></Board>
      </div>
      <div className=" bg-gray-950 p-5">
        {moves}
      </div>
    </div>
  )
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6], 
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
