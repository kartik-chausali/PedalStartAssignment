import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { useTodos } from "../hooks/useTodo";
import { Skeleton } from "../components/animation/Skeleton";
import {Todo} from '../hooks/useTodo'
import { TodoCard } from "../components/TodoCard";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";


export function Landing(){

    const {userId} : any= useParams();
    const {todos, loading} = useTodos({userId});
    const [todosList, setTodosList] = useState(todos);

    const navigate = useNavigate();

    useEffect(()=>{
        if(todos){
             setTodosList(todos);
        }       
    },[todos])

    function logout(){
        localStorage.removeItem('token')
        toast.success("Logged out");
        navigate('/signup');
    }

    function addNewTask(){
        navigate(`/addTask/${userId}`)
    }

    function handleDelete(todoId :string){
        setTodosList(todosList?.filter(todo => todo.id !== todoId))
    }

    if(loading){
       return <div>
            <AppBar onClick={addNewTask} onClickLogout={logout}/>
            <div className="flex justify-center">
            <div className="w-1/2 ">
              <Skeleton />
             <Skeleton />
             <Skeleton />   
             <Skeleton />   
             <Skeleton />   
            </div>
            </div>
        </div>

        
    }else{
        return <div>
        <AppBar onClick={addNewTask} onClickLogout={logout}/>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                todosList?.map(todo=>
                    <TodoCard tittle={todo.tittle} description = {todo.description}  todoId={todo.id} onDelete={handleDelete}  dueDate={todo.dueDate} priority={todo.priority}
                    />)
            }
        </div>
        
    </div>
    }
   
}

