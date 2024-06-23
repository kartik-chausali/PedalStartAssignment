import { Link } from "react-router-dom";
import axios from 'axios'
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

export function AppBar({onClick, onClickLogout}:{onClick : ()=>void, onClickLogout:()=>void}){

    const [id, setId] = useState('');
    const [name , setName ] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        getUserId({setId, setLoading});
    }, [id])

    if(!loading){
        getUser({id, setName})
    }

    return <div className="border-b-2 px-4 bg-gray-900 text-white md:px-6 py-3 items-center flex justify-between">
        <span className="font-bold text-sm md:text-xl">TaskManagement</span>
        <div className=" md:flex items-center gap-6">
        <button onClick={onClick} className="h-8 w-15 md:h-12 px-6 font-bold text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">+ Add new Task</button>
        </div>

        <div>
        <span className="font-bold text-sm md:text-xl">Hello! {name}</span>
            <Link to={'/'}>
            <button type="button" onClick={onClickLogout} className="h-8 w-15  md:w-fit md:px-2 ml-1 md:py-2 text-sm md:font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg fill="#000000" height="15px" className="mr-3 "width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 384.971 384.971" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="Sign_Out"> <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03 C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03 C192.485,366.299,187.095,360.91,180.455,360.91z"></path> <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279 c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179 c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"></path> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>
                Logout
            </button>
            </Link>
        </div>
       
      
    </div>
}

export async function getUserId({setId, setLoading}:{setId: (val:string)=>void , setLoading:(val:boolean)=>void}){
    const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`,{
        headers:{
            Authorization: localStorage.getItem('token')
        }
    })

    setId(res.data.payload.id);
    setLoading(false)
}

async function getUser({id, setName} : {id:string, setName: (val: string)=>void}){
    const res = await axios.get(`${BACKEND_URL}/api/v1/user/me/${id}`);
    setName(res.data.name)
}