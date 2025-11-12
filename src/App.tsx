
import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './Pages/Home'
import List from './Pages/List'
function App() {

  return (
    <>
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/' element={<List/>}/>
      {/* <Route path='/' element={<Signup/>}/>
      <Route path='signin' element={<Signin/>}/> */}
    </Routes>
    
    </> 
  )
}

export default App
