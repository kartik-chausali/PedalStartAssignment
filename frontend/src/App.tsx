
import './App.css'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { AddTask } from './pages/AddTask'
import { ReadMore } from './pages/ReadMore'

function App() {

  return (
   <>
   <div>
    <Toaster
    position='top-center'
    toastOptions={{
      success:{
        iconTheme:{
          primary:"#747bff",
          secondary:"#747bff"
        }
      }
    }}></Toaster>
   </div>

    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/landing/:userId' element={<Landing/>}/>
    <Route path='/addTask/:userId' element={<AddTask/>}/>
    <Route path='/readMore' element={<ReadMore/>}/>
    </Routes>
    </BrowserRouter>
   
   </>
  )
}

export default App
