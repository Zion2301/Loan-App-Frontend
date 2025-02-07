import img from "../assets/logo.png"
import "./Dashboard.css"
import { IoSpeedometer } from "react-icons/io5";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { TbCreditCardPay } from "react-icons/tb";
import { FaGear } from "react-icons/fa6";
import { MdHelpOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaRegBell } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
const Dashboard = () => {
    const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      setDate(new Date().toLocaleDateString());
      setTime(new Date().toLocaleTimeString());
    };

    updateDateTime(); // Set immediately
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <>
      <div className="main-dashboard">
        <div className="left-dash">
            <img src={img} alt="" className="another-logo"/>
            <div className="inner-left-div">
            <div className="dash-links">
               <Link className="special"><IoSpeedometer/> Overview</Link>
               <Link className="ordinary"><FaMoneyBill1Wave/> Apply Loan</Link>
               <Link className="ordinary"><BsFillCreditCard2FrontFill/> Payment Details</Link>
               <Link className="ordinary"><TbCreditCardPay/> Pay</Link>
            </div>

            <div className="lower-links">
            <Link className="ordinary"><FaGear/> Settings</Link>
            <Link className="ordinary"><MdHelpOutline/> Help & Support</Link>
            </div>
            </div>
        </div>

        <div className="right-dash">
            <div className="acc-date">
            <div className="date-div">
            <p className="date">{date}</p>
            <p className="date">{time}</p>
            </div>

            <div className="acc-details">
                <FaRegBell className="alert"/>
                 <GoPerson className="alert"/>
                 <p className="welcome">Zion</p>
            </div>
            </div>

            wid
        </div>
      </div>
    </>
  )
}

export default Dashboard