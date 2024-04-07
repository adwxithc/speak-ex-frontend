

import './App.css'
import Dashboard from './pages/admin/dashboard/Dashboard.js'
import Test from './pages/user/Test.tsx'
import Test2 from './pages/user/Test2.tsx'
import {BrowserRouter,Route,Routes} from 'react-router-dom'

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='admin/*' element={<Dashboard />}/>
        <Route path='*' element={<Test2 />}/>
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
