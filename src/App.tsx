import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Areas from './pages/Areas'
import Registros from './pages/Registros'
import Navbar from './components/NavBar/Navbar'
import AreaDetalhe from './pages/AreaDetalhe'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/areas" element={<Areas />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/registros' element={<Registros />}/>
        <Route path='/areas/:id' element={<AreaDetalhe />} />
      </Routes>
    </BrowserRouter>  
  )
}

export default App