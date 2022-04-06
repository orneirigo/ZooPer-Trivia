import axios from 'axios';

export const LOGIN_USER_GUEST = 'LOGIN_USER_GUEST'
export const LIST_USERS_IN_PRE_ROOM = 'LIST_USERS_IN_PRE_ROOM'
export const SET_READY = 'SET_READY'
export const NEW_USER = 'NEW_USER'
export const LOGIN = 'LOGIN'
export const HOST = 'HOST'
export const CREATE_ROOM = 'CREATE_ROOM'
export const GET_AVATARS = 'GET_AVATARS'
export const LIST_ROOMS = 'LIST_ROOMS'
export const CHANGE_READY = 'CHANGE_READY'
export const GET_QUESTIONS = 'GET_QUESTIONS'
export const GET_READY_USER = 'GET_READY_USER'



export function loginAsGuest(guest){
    return async function(dispatch){
        try{
            const test = await axios.post('http://localhost:3001/users', guest)
            dispatch({type: 'LOGIN_USER_GUEST', payload: test.data})
            console.log(test.data)
            return test.data
        }catch(e) {
            console.log(e)
        }
    }
}

export function registerUser(user){
    return async function(dispatch){
        try{
            const {data} = await axios.post('http://localhost:3001/users', user)
            dispatch({type: 'NEW_USER', payload: data})
        }catch(e) {
            console.log(e)
        }
    }
}

export function loginUser(email){
    return async function(dispatch){
        try{
            const {data} = await axios.get(`http://localhost:3001/users?email=${email}`)
            dispatch({type: 'LOGIN', payload: data})
            return data
        }catch(e) {
            console.log(e)
        }
    }
}

export const updateUser = (userData)=> async ()=>{
    try {
        const result = await axios.put(`http://localhost:3001/users`, userData)  
    } catch (error) {
        console.log(error)
    }
}

export function modifyHost(email, host){
    return async function(dispatch){
        try{
            const {data} = await axios.put(`http://localhost:3001/users/?email=${email}&host=${host}`)
            dispatch({type: 'HOST', payload: data})
            return data
        }catch(e){
            console.log(e)
        }
        
    }
}

export function createRoom(user){
    return async function(dispatch){
        try{
            const {data} = await axios.post('http://localhost:3001/gameRoom', {name: user.name, idUser: user.id, currentAvatar: user.currentAvatar})
            console.log(data)
            dispatch({type: 'CREATE_ROOM', payload: data})
            return data
        }catch(e) {
            console.log(e)
        }
    }
}

export const getAvatars = ()=> async (dispatch)=>{
    try {
        const result = await axios.get(`http://localhost:3001/avatar`)
        dispatch({type: GET_AVATARS, payload: result.data}) 
    } catch (error) {
        console.log(error)
    }
} 

export function AddUserToPreRoom({idGameRoom, idUser}){
    return async function(){
        console.log(idGameRoom, idUser)
        try{
            const {data} = await axios.put('http://localhost:3001/gameRoom', {idUser, idGameRoom})
            return data
        }catch(e) {
            console.log(e)
        }
    }
}
//arreglar en back
export function listUsersInPreRoom(IdRoom){
    return async function(dispatch){
        try{
            const {data} = await axios.get(`http://localhost:3001/gameRoom/?idRoom=${IdRoom}`)
            dispatch({type: 'LIST_USERS_IN_PRE_ROOM', payload: data})
        }catch(e) {
            console.log(e)
        }
    }
}

export function getReadyUser(id){
    return async function(dispatch){ // me traigo el id y ready(un bolean)
        try{ 
            const {data} = await axios.get(`http://localhost:3001/users/ready/?id=${id}`)
            dispatch({type: 'GET_READY_USER', payload: data})
        }catch(e) {
            console.log(e) 
        }
    }
}

export function listAllRooms(){
    return async function(dispatch){
        try{
            const {data} = await axios.get('http://localhost:3001/gameRoom')
            dispatch({type: 'LIST_ROOMS', payload: data})
        }catch(e) {
            console.log(e)
        }
    }
}

export function newQuestion(question){
    return async function(){
        try{
            const data = await axios.post('http://localhost:3001/newQuestion',question)
            
        }catch(e) {
            console.log(e)
        }
    }
}

export function getNewQuestions(){
    return async function(dispatch){
        try{
            const {data} = await axios.get('http://localhost:3001/newQuestion')
            dispatch({type: GET_QUESTIONS , payload: data})
        }catch(e) {
            console.log(e)
        }
    }
}