import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CardBuy from "./cardBuy";
import '../STYLES/playstore.css'
import axios from 'axios'
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import UserCard from "../HOME/userCard";


function PlayStore() {

    const history = useHistory()
    const autenticado = localStorage.getItem('token')
    const [productos, setProductos] = useState([])
    const {user} = useSelector((state) => state)

    function volverHome(){
        history.push('/home')
    }

    useEffect(() => {
        async function traerProductos(){
            const algo = await axios.get('http://localhost:3001/coins')
            setProductos(algo.data)
        }
        traerProductos()
    } , [])

    if(user.guest){
        Swal.fire({
            icon: "error",
            title:
              "Debes tener una cuenta para ingresar a la tienda",
            showConfirmButton: false,
            heightAuto: false,
            timer: 3000,
          });
        history.push('/home')
    }


    if(autenticado){
        return (
            <div className="containerPlayStore">
                <div className="contentNavPlayStore">
                <button onClick={volverHome} className="btnVolverTienda" type="button">Volver</button>
                <UserCard />
                </div>
                <h1>Comprar Monedas</h1>
                <div className="containerCardsBuy">
                    {productos?.length > 0 && productos?.map(producto => (
                        <CardBuy
                            key={producto.id}
                            img={producto.url}
                            precio={producto.coins}
                            referencia={producto.id}
                        />
                    ))}
                </div>
            </div>
        ) 
    } else{
          history.push('/')
          return <div></div>
    }
    
}
 

export default PlayStore;