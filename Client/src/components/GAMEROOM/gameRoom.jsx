import React, { useState } from "react";
import "../STYLES/gameRoom.modules.css";
import ChatGameRoom from "./gameAlerts";
import Game from "./game";
import ListPlayersRoom from "./listPlayersRoom";
import EndGame from "./endGame";
import { useSelector } from "react-redux";

function GameRoom({ preRoomUsers, setGame, positions, allStartGame, everybodyPlays, points }) {
  const { user } = useSelector((state) => state);
  const [showEndGame, setShowEndGame] = useState(false)
  const [userCoins, setUserCoins] = useState(user.coins);  
  
  return (
    <div className="containerGameRoom">
      { !showEndGame ?
        <>
        <ListPlayersRoom preRoomUsers={preRoomUsers}  />
        <Game setGame={setGame} userCoins={userCoins} setUserCoins={setUserCoins} setShowEndGame={setShowEndGame} showEndGame={showEndGame} positions={positions} allStartGame={allStartGame} everybodyPlays={everybodyPlays} />
        <ChatGameRoom preRoomUsers={preRoomUsers} points={points} />
        </>
        : <div>
          <EndGame userCoins={userCoins}/>
        </div>
      }
      </div>
  );
}

export default GameRoom;
