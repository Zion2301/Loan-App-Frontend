import "./Navbar.css"
import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import { useState } from "react"
import Modal from "./Modal"
const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
  return (
   <>
     <nav className="navbar">
        <img src={logo} alt="" className="logo" />

        <div className="links">
            <Link className="how">How it Works</Link>
            <button className="apply" onClick={() => setShowModal(true)}>Apply Now</button>
            <Link className="how">FAQ</Link>
        </div>
     </nav>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
   </>
  )
}

export default Navbar