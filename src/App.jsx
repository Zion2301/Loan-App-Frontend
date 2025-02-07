import './App.css'
// import Home from './components/Home'
// import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
// import Signup from './components/Signup'
// import Login from './components/Login'
// import Dashboard from './components/Dashboard'
import LoanDashboard from './components/LoanDashboard'
function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={<Home/>}></Route>
          <Route path='/register' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route> */}
          <Route path='/' element={<LoanDashboard/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
