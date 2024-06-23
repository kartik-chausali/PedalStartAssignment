import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"



export function ReadMore(){
    const {state} = useLocation();
    const navigate = useNavigate()
    useEffect(()=>{
        if(!state){
           navigate(-1) 
        }
        
    }, [state, navigate])

    return <div className="flex justify-center items-center min-h-screen">
    <div className=" max-w-sm rounded overflow-hidden shadow-lg w-1/2 ">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{state?.tittle} </div>
      <div className="text-gray-700 text-base" dangerouslySetInnerHTML={{__html:state?.description}}>
      
      </div>
    </div>
    <div className="px-6 pt-4 pb-2">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Due Date: {state?.dueDate.slice(0, 10)}</span>
    </div>
  </div>
  </div>
}