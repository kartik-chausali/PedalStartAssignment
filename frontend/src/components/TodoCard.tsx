import axios from "axios"
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom";
import { Priority } from "../hooks/useTodo";
export function TodoCard({tittle, description, todoId,onDelete, dueDate}:{tittle:string, description:string, todoId:string, onDelete:(id:string)=>void, priority:Priority, dueDate:string}){

const navigate = useNavigate();
const {userId} = useParams()
let type = "edit";
    async function deleteTask(){
    console.log("inside function")
    try{
        console.log(todoId)
        await axios.post(`${BACKEND_URL}/api/v1/todo/delete/${todoId}`,{},  {
        headers:{
            Authorization:localStorage.getItem('token')
        }
    });
      navigate(`/landing/${userId}`)
      onDelete(todoId)
      toast.success("Task delete succeessfully");
    }catch(err : any ){
       toast.error(`${err.response.data.msg}`);
    }
    

}

    return <div>
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center">
             <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{tittle}</h5>
        </a>
        <button className="text-white" onClick={()=>{
            navigate(`/addTask/${userId}` , {state:{todoId, tittle, description, type, dueDate}})
        }}>edit</button>
        <button className="cursor-pointer" onClick={deleteTask}>
        <svg fill="#FFFFFF" height="15px" width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_6_"> <g id="XMLID_11_"> <path d="M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105 C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75 S266.355,300,225,300z"></path> </g> <g id="XMLID_18_"> <path d="M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45 H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z"></path> </g> <g id="XMLID_23_"> <path d="M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0 c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213 c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606 c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225 l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z"></path> </g> </g> </g></svg>
        </button>
        </div>
       
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{__html:description}}></p>
        <a href="#" onClick={()=>{
            navigate('/readMore', {state:{todoId, tittle, description, type, dueDate}})
        }}className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            More detail
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
       
    </div>
    </div>
}

export function Circle(){
    return <div></div>
}