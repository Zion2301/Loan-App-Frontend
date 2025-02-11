import img from "../assets/logo.png";
import "./Dashboard.css";
import { IoSpeedometer } from "react-icons/io5";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { TbCreditCardPay } from "react-icons/tb";
import { FaGear } from "react-icons/fa6";
import { MdHelpOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

const Pay = () => {
  const [loanId, setLoanId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire("Error", "Authentication failed. Please log in.", "error");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/payments/pay",
        { loanId: parseInt(loanId), amount: parseInt(amount) }, // Ensure integers
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire("Success", "Payment successful!", "success");
      setLoanId("");
      setAmount("");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Payment failed", "error");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="main-dashboard">
        <div className="left-dash">
          <img src={img} alt="" className="another-logo" />
          <div className="inner-left-div">
            <div className="dash-links">
              <Link className="ordinary" to="/dashboard">
                <IoSpeedometer /> Overview
              </Link>
              <Link className="ordinary" to="/loan">
                <FaMoneyBill1Wave /> Apply Loan
              </Link>
              <Link className="ordinary" to="payment">
                <BsFillCreditCard2FrontFill /> Payment Details
              </Link>
              <Link className="ordinary">
                <TbCreditCardPay /> Pay
              </Link>
            </div>

            <div className="lower-links">
              <Link className="ordinary">
                <FaGear /> Settings
              </Link>
              <Link className="ordinary">
                <MdHelpOutline /> Help & Support
              </Link>
            </div>
          </div>
        </div>

        <div className="right-dash">
          <div className="inner-right-dash">
          <div className="form-shi">
            <h2 className="values">Enter Values for Payment</h2>

            <label  className="label">LoanId:</label>
            <input
              type="number"
              name="loanId"
              placeholder="Enter LoanId"
              className="stuff"
              value={loanId}
              onChange={(e) => setLoanId(e.target.value)}
            />

            <label className="label">Amount:</label>
            <input
              type="number"
              name="amount"
              className="stuff"
              placeholder="Enter Amount to be paid"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button className="submit" onClick={handlePayment} disabled={loading}>
              {loading ? "Processing..." : "Pay"}
            </button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pay;
