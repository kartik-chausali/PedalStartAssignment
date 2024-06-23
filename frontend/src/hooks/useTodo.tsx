import { useEffect, useState } from "react"
import toast from 'react-hot-toast'
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"


export enum Priority{
    URGENT,
    IMPORTANT,
    NORMAL

}
export interface Todo{
    tittle:string, 
    description:string, 
    id:string, 
    author:{
        name:string
    },
    dueDate:string,
    priority:Priority
}

export const useSingleTodo = ({id}:{id:string})=>{
    const [loading, setLoading] = useState(true);
    const [todo, setTodo] = useState<Todo>();

    useEffect(()=>{
        fetchTodo({id, setLoading, setTodo})
    }, [id])

    return {loading, todo}
}

async function fetchTodo({id, setLoading, setTodo}:{id:string, setLoading:(val:boolean)=>void, setTodo:(val:Todo)=>void}){
    try{
        const res = await axios.get(`${BACKEND_URL}/api/v1/todo/single/${id}`, {
            headers:{
                Authorization:localStorage.getItem('token')
            }
        });
        setTodo(res.data.todo);
        setLoading(false);
    }catch(e){
        if(axios.isAxiosError(e)){
            toast.error(e.response?.data || "An Error occured");
        }else{
            toast.error("An unexpected Error Occured");
        }
    }

}

export const useTodos = ({userId}:{userId:string})=>{
  
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState<Todo[]>();
    const [authorized, setAuthorized] = useState(true);
    const navigate = useNavigate()

    useEffect(()=>{
        fetchTodos({setTodos, setLoading, setAuthorized,userId, loading})
    },[])

    if(authorized==false){
        navigate('/')
    }

   return {loading, todos} 
}


async function fetchTodos({setTodos, setLoading, setAuthorized,userId}:{setTodos: (val:Todo[])=>void  , setLoading:(val:boolean)=>void , setAuthorized:(val:boolean)=>void,  userId:string, loading:boolean} ){
     
        try{

            const res = await axios.get(`${BACKEND_URL}/api/v1/todo/todos/${userId}`, {
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            });

            setTodos(res.data.todo);
            setAuthorized(true);
            setLoading(false);
            console.log("hel", res);
            
        }catch(e){
            setLoading(true);
            setAuthorized(false);
            toast.error('unauthorized');
        }
    
    
}
