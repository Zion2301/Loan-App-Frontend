import './App.css'
import Home from './components/Home'
// import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import PaymentDetails from './components/PaymentDetails'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import LoanDashboard from './components/LoanDashboard'
import Pay from './components/Pay'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/register' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/paydash' element={<Pay/>}></Route>
          <Route path='/loan' element={<LoanDashboard/>}></Route>
          <Route path='/payment' element={<PaymentDetails/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
