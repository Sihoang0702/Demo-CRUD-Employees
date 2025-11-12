
import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './Pages/Home'
import List from './Pages/List'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
function App() {

  return (
    <>
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='products' element={<List/>}/>
      <Route path='/' element={<Signup/>}/>
      <Route path='signin' element={<Signin/>}/>
    </Routes>
    
    </> 
  )
}

export default App
