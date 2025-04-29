import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import Swal from "sweetalert2";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert to boolean
  }, []);

  // Logout function
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("userId")
        setIsLoggedIn(false);
        navigate("/login");
  
        Swal.fire("Logged Out!", "You have been successfully logged out.", "success");
      }
    });
  };

  return (
    <>
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" />

        <div className="links">
          <Link className="how">How it Works</Link>
          <Link className="how">FAQ</Link>

          {/* Show Dashboard & Logout if logged in, else show Apply Now */}
          {isLoggedIn ? (
            <>
              <Link className="how" to="/dashboard">Dashboard</Link>
              <button onClick={handleLogout} className="logout">Logout</button>
            </>
          ) : (
            <button className="apply" onClick={() => setShowModal(true)}>Apply Now</button>
          )}
        </div>

        <GiHamburgerMenu className="burger" onClick={() => setShowModal(true)} />
      </nav>

      {/* Show Modal if user clicks Apply Now */}
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;
