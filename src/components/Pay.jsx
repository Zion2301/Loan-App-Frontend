import img from "../assets/logo.png"
import "./Dashboard.css"
import { IoSpeedometer } from "react-icons/io5";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { TbCreditCardPay } from "react-icons/tb";
import { FaGear } from "react-icons/fa6";
import { MdHelpOutline } from "react-icons/md";
import { Link } from "react-router-dom";
const Pay = () => {
  return (
    <>
     <div className="main-dashboard">
        <div className="left-dash">
             <img src={img} alt="" className="another-logo"/>
                        <div className="inner-left-div">
                        <div className="dash-links">
                           <Link className="ordinary" to="/dashboard"><IoSpeedometer/> Overview</Link>
                           <Link className="ordinary" to="/loan"><FaMoneyBill1Wave/> Apply Loan</Link>
                           <Link className="ordinary" to="payment"><BsFillCreditCard2FrontFill/> Payment Details</Link>
                           <Link className="special"><TbCreditCardPay/> Pay</Link>
                        </div>
            
                        <div className="lower-links">
                        <Link className="ordinary"><FaGear/> Settings</Link>
                        <Link className="ordinary"><MdHelpOutline/> Help & Support</Link>
                        </div>
                  </div>
        </div>

        <div className="right-dash">
        <div className="form-shi">
            <h2 className="values">Enter Values for Payment</h2>

            <label>LoanId:</label>
            <input
              type="number"
              name="loanId"
              placeholder="Enter LoanId"
              className="inputStyle"
            />

            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              className="inputStyle"
              placeholder="Enter Amount to be paid"
            />
            <button className="buttonStyle">
              Pay
            </button>
          </div>
        </div>
     </div>
    </>
  )
}

export default Pay