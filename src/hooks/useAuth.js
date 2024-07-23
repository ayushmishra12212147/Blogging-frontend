/* eslint-disable no-unused-vars */
import axios from "axios";
import { isEmpty } from "lodash-es";
import {  useSnapshot, snapshot } from "valtio";
import { proxy } from "valtio";


function getAuthUser(){
    const jwt=window.localStorage.getItem('jwtToken')
    if(!jwt)  return {};
    return JSON.parse(atob(jwt))
}

const state = proxy(
    {
        authUser:getAuthUser(),
    }
)

const isAuth  = snapshot(state);

const actions ={
    login :(user)=>{
        // console.log('actions',{user,state})
        state.authUser=user;
        // console.log("here ",state.authUser);
        const token=state.authUser.token;
        console.log(token);
        window.localStorage.setItem('jwtToken',btoa(JSON.stringify(state.authUser)))
        // axios.defaults.headers.Authorization=`Token ${token}`
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    },
    logout:()=>{
        

        state.authUser={};
        window.localStorage.removeItem('jwtToken');
        delete axios.defaults.headers.common['Authorization'];
        
    }

}




function useAuth() {
    const snap=useSnapshot(state);
    // console.log('snap',{snap})

    const getAuthStatus=()=>(!isEmpty(snap.authUser));
  return {
    ...snap,
    ...actions,
    isAuth : getAuthStatus()
  }
}

export default useAuth

