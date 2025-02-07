import "./Modal.css"
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";
const Modal = ({ onClose }) => {
  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="left-modal">
             < FiLogIn className="login-icon"/>
             <p className="new">New User</p>
             <p className="create">If this is your first time using our services, create an account to get started</p>
             <Link className="create-btn" to="/register">Create Account</Link>
          </div>

          <div className="right-modal">
             < IoMdPerson className="login-icon"/>
             <p className="new">Existing User</p>
             <p className="create">If you already have an account with us, all you have to do is login below:</p>
             <Link className="create-btn" to="/login">Login</Link>
          </div>
        {/* <button onClick={onClose} className="close-btn">Close</button> */}
      </div>
    </div>
    </>
  )
}

export default Modal