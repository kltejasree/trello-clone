
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Board from './components/Board'
import BoardLists from './components/BoardLists'
import Navbar from './components/Navbar'
import Cards from './components/Cards'


const App = () => {
  return (
  <>
    <Navbar />
    <Routes>
      <Route path = '/' element = {<Board />} />
      <Route path = '/boards/:boardId' element = {<BoardLists />} />
      
      

    </Routes>
    <Cards />

    

    

    
    
    
  </> 

    
  )
}

export default App