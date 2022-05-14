import React, { useState } from "react";

function App() {
  var slotsAvailable = ['A1', 'B1', 'C1', 'A2', 'B2', 'C2', 'A3', 'B3', 'C3'];
  const winningComb = [['A1', 'B1', 'C1'], ['A2', 'B2', 'C2'], ['A3', 'B3', 'C3'], ['A1', 'A2', 'A3'], ['B1', 'B2', 'B3'], ['C1', 'C2', 'C3'], ['A1', 'B2', 'C3'], ['C1', 'B2', 'A3']];

  var playerSlots = [];
  var cpuSlots = [];

  const [message, setMessage] = useState("");
  const [result, setResult] = useState(false);

  function cpuMark() {
    console.log("here");
    const chosenSlot = slotsAvailable[Math.floor(Math.random() * slotsAvailable.length)];
    document.getElementById(chosenSlot).click();
  }

  function handleClick(event) {
    const tile = event.target;
    console.log(event);
    const slotIndex = slotsAvailable.indexOf(tile.id);
    slotsAvailable.splice(slotIndex, 1);
    if(event.isTrusted === true){
      tile.innerHTML = "X";
      playerSlots.push(tile.id);
      tile.disabled = true;
      checkWin(playerSlots, "player");
      cpuMark();
    }else{
      tile.innerHTML = "O";
      cpuSlots.push(tile.id);
      tile.disabled = true;
      checkWin(cpuSlots, "cpu");
    }
  }

  function checkWin(slots, who) {
    var end = false;

    for(var n = 0; n < winningComb.length; n++){
      var [n1, n2, n3] = winningComb[n];

      slots.includes(n1) && slots.includes(n2) && slots.includes(n3) && (end = true);

      if(end){
        if(who === "player"){
          setMessage("🎉You Win!🎉");
          document.getElementById(n1).classList.add("user-winner");
          document.getElementById(n2).classList.add("user-winner");
          document.getElementById(n3).classList.add("user-winner");
          setTimeout(function() {
            setResult(true);
          }, 1000);
          break;
        }else{
          setMessage("😔You lose.😔");
          document.getElementById(n1).classList.add("cpu-winner");
          document.getElementById(n2).classList.add("cpu-winner");
          document.getElementById(n3).classList.add("cpu-winner");
          setTimeout(function() {
            setResult(true);
          }, 1000);
          break;
        }
      }
    }
  }

  return(
    <div>

      {!result && (
        <div id="game" className="game-box">
          <h1 className="title">TicTacToe</h1>

          <div className="row top-row">
            <button onClick={handleClick} className="top-left game-btn" id="A1" type="button" name="button">.</button>
            <button onClick={handleClick} className="top-center game-btn" id="B1" type="button" name="button">.</button>
            <button onClick={handleClick} className="top-right game-btn" id="C1" type="button" name="button">.</button>
          </div>
          <div className="row mid-row">
            <button onClick={handleClick} className="mid-left game-btn" id="A2" type="button" name="button">.</button>
            <button onClick={handleClick} className="mid-center game-btn" id="B2" type="button" name="button">.</button>
            <button onClick={handleClick} className="mid-right game-btn" id="C2" type="button" name="button">.</button>
          </div>
          <div className="row bottom-row">
            <button onClick={handleClick} className="bottom-left game-btn" id="A3" type="button" name="button">.</button>
            <button onClick={handleClick} className="bottom-center game-btn" id="B3" type="button" name="button">.</button>
            <button onClick={handleClick} className="bottom-right game-btn" id="C3" type="button" name="button">.</button>
          </div>
        </div>
      )}

      {result && (
        <div className="scoreboard" id="scoreboard">
          <h1 id="score">{message}</h1>
            <button onClick={() => {window.location.reload(false)}} type="button" name="button" className="restart-btn">Play Again.</button>
        </div>
      )}

    </div>
  );

}

export default App;
