import React, { useEffect, useState } from "react";
import "../STYLES/gameListRoom.modules.css";
import { NavLink } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineRefresh } from "react-icons/hi";
import Search from "../IMG/search.png";
import { useDispatch, useSelector } from "react-redux";
import { listAllRooms } from "../../redux/actions";


function GameListRoom() {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state);
  const {listRooms} = useSelector(state => state)

/*   useEffect(() => {
    setGames(arrayGames);
  }, [setGames]); */

/*   const searchGames = (e) => {
    if (e && e !== "") {
      const listGames = games.filter((a) =>
        a.name.toLowerCase().includes(e.toLowerCase())
      ); */
/*       setGames(listGames); */
/*       console.log(listGames); */
/*     }
  }; */
  useEffect(() =>{
    dispatch(listAllRooms())
  })

  const refreshGames = () => {
    dispatch(listAllRooms())
  };

  return (
    <div className="containerGameList">
      <div className="navGameList">
        <NavLink style={{ textDecoration: "none" }} to={"/home"}>
        <button className="buttonVolver">
          <AiOutlineArrowLeft style={{ marginRight: "0.4rem" }} /> Volver
        </button>
        </NavLink>
        <div className="buscadorGameList">
          <button className="refreshGameList" onClick={refreshGames}>
            <HiOutlineRefresh />
          </button>
          <input
            type="text"
            placeholder="Buscar partidas"
            /* onChange={(e) => searchGames(e.target.value)} */
          />
          <img className="shGamelist" src={Search} alt="Search" />
        </div>
      </div>
      <div className="subtitleGameList">
        <h4>Anfitrión</h4>
        <h4>Integrantes</h4>
        <h4>Preguntas</h4>
        <span></span>
        <span></span>
      </div>
      {listRooms?.length > 0 ? (
        listRooms?.map((game) => {
          return (
            <div key={game.id} className="infoPartidas">
              <span>{game.name}</span>
              <span>{game.numberUsersInRoom}</span>
              <span>{game.questionAmount}</span>
              <NavLink to={`/room/${game.id}`} >
                <button className="unirseGameList">Unirse</button>
              </NavLink>
            </div>
          );
        })
      ) : (
        <h3>No hay partidas disponibles</h3>
      )}
    </div>
  );
}

export default GameListRoom;
