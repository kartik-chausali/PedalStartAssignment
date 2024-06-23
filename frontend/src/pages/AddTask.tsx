import axios from "axios";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import ReactQuill from "react-quill";
import { Spinner } from "../components/animation/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export function AddTask(){
    const navigate = useNavigate()
    const {userId} = useParams();
    const {state} = useLocation();
    const [inputs , setInputs] = useState({
        tittle: state?.tittle || "",
        description: state?.description || "", 
        dueDate:"",
        priority:"",
        type:state?.type || "normal", 
        id:state?.todoId || ""
    })
    
    const[loading , setLoading] = useState(false);
    
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean'],
        ],
        clipboard: {
            matchVisual: false,
          },
      }
    
      const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]

      async function createNewTask(e : FormEvent){
        e.preventDefault()
        
        if(inputs.type=="edit"){
            console.log("inside edit")
            const {tittle, description, dueDate, id} = inputs;
            const editBody = {tittle, description, dueDate, id}
            try{
                setLoading(true);
                await axios.put(`${BACKEND_URL}/api/v1/todo`, editBody, {
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                })
                toast.success("Task Updated")
            navigate(`/landing/${userId}`);
            }catch(err : unknown){
            setLoading(false);
            if(axios.isAxiosError(err)){
                toast.error(err.response?.data || "An error occured");
            }else{
                toast.error("Unexpected Error Occured")
            }
        }
        }else{
            console.log("inside new")
            try{
            setLoading(true);
            const {tittle, description, dueDate } = inputs
            const requestBody = {tittle, description, dueDate }
              await axios.post(`${BACKEND_URL}/api/v1/todo`, requestBody,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
             });
             toast.success("New Task Added")
            navigate(`/landing/${userId}`);
        }catch(err : unknown){
            setLoading(false);
            if(axios.isAxiosError(err)){
                toast.error(err.response?.data || "An error occured");
            }else{
                toast.error("Unexpected Error Occured")
            }
        }
        }
        
       

      }

      

      return <form onSubmit={createNewTask}>
        <div className='flex flex-col'>
                <input className="border border-black p-4 mt-5" placeholder='TITTLE' type='text' value={inputs.tittle}  onChange={(e)=>{
            setInputs({
                ...inputs,
                tittle:e.target.value
            })
        }}/>

                <DatePicker 
                    className="border border-black p-4 mt-5"
                    selected={inputs.dueDate ? new Date(inputs.dueDate) : null}
                    onChange={(date) => {
                        setInputs({
                            ...inputs,
                            dueDate: date ? date.toISOString() : ""
                        });
                    }}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Due Date"
                />

                    <div className="flex items-center gap-2">
                        <label>Choose priority of task</label>
                    <select 
                    className="h-15 border border-black p-4 mt-5 w-1/4 rounded-lg"
                    onChange={(e) => {
                        setInputs({
                            ...inputs,
                            priority: e.target.value
                        });
                    }}
                >
                    <option value="Urgent">Urgent 🔴</option>
                    <option value="Important">Important 🟡</option>
                    <option value="Normal">Normal 🟢</option>
                </select>
                    </div>
                    
        <ReactQuill className='h-40 w-full mt-4' theme='snow' defaultValue={inputs.description} placeholder='DESCRIPTION' value = {inputs.description} modules={modules} formats={formats} onChange={(newValue)=>{
            setInputs({
                ...inputs,
                description: newValue
            })
        }}/>
        <div className='flex justify-center mt-5'>
         <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-10 w-1/2  ">
        {loading? <Spinner/> : 'Add Task'}
        </button>    
        </div>
        
        </div>
     
    </form>
}


