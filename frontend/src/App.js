import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import FooterArea from './components/Footer'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Applied from './pages/Applied'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/applied' element={<Applied />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
          <FooterArea />
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App