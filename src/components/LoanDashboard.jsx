import "./Dashboard.css";
import { IoSpeedometer } from "react-icons/io5";
import { FaMoneyBill1Wave, FaGear } from "react-icons/fa6";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { TbCreditCardPay } from "react-icons/tb";
import { MdHelpOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import img from "../assets/logo.png";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const LoanDashboard = () => {
  const [type, setType] = useState("personal"); // Matches backend key
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState(4); // Matches backend key
  const [error, setError] = useState("");

  // Loan type price ranges
  const loanLimits = {
    personal: { min: 50000, max: 500000 },
    business: { min: 500000, max: 5000000 },
    education: { min: 100000, max: 2000000 },
  };

  // Handle loan type change
  const handleTypeChange = (e) => {
    setType(e.target.value);
    setAmount("");
    setError("");
  };

  // Handle amount change
  const handleAmountChange = (e) => {
    const value = parseInt(e.target.value, 10) || "";
    setAmount(value);

    if (value && (value < loanLimits[type].min || value > loanLimits[type].max)) {
      setError(`Amount must be between ₦${loanLimits[type].min.toLocaleString()} and ₦${loanLimits[type].max.toLocaleString()}`);
    } else {
      setError("");
    }
  };

  // Handle loan term change
  const handleTermChange = (e) => {
    setTerm(parseInt(e.target.value, 10));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || amount < loanLimits[type].min || amount > loanLimits[type].max) {
      setError(`Amount must be between ₦${loanLimits[type].min.toLocaleString()} and ₦${loanLimits[type].max.toLocaleString()}`);
      return;
    }

    const loanData = { amount, type, term };

    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "You must be logged in to apply for a loan.",
        confirmButtonColor: "#f39c12",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/loans/apply", loanData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Loan Application Successful",
        text: `Your loan request of ₦${amount.toLocaleString()} (${type}) has been submitted.`,
        confirmButtonColor: "#58bc82",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Application Failed",
        text: error.response?.data?.message || "Error applying for loan. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="main-dashboard">
      <div className="left-dash">
        <img src={img} alt="Logo" className="another-logo" />
        <div className="inner-left-div">
          <div className="dash-links">
            <Link className="ordinary" to="/dashboard"><IoSpeedometer /> Overview</Link>
            <Link className="special"><FaMoneyBill1Wave /> Apply Loan</Link>
            <Link className="ordinary" to="/payment"><BsFillCreditCard2FrontFill /> Payment Details</Link>
            <Link className="ordinary" to="/paydash"><TbCreditCardPay /> Pay</Link>
          </div>
          <div className="lower-links">
            <Link className="ordinary"><FaGear /> Settings</Link>
            <Link className="ordinary"><MdHelpOutline /> Help & Support</Link>
          </div>
        </div>
      </div>

      <div className="right-dash">
        <StyledWrapper>
          <form className="form-new" onSubmit={handleSubmit}>
            <span className="input-span">
              {/* Loan Type Dropdown */}
              <label className="label">Loan Type</label>
              <select value={type} onChange={handleTypeChange} className="stuff">
                <option value="personal">Personal Loan</option>
                <option value="business">Business Loan</option>
                <option value="education">Education Loan</option>
              </select>
            </span>

            <span className="input-span">
              {/* Loan Amount Input */}
              <label className="label">Loan Amount (₦)</label>
              <input type="number" value={amount} onChange={handleAmountChange} placeholder="Enter amount" />
              {error && <p className="error">{error}</p>}
            </span>

            <span className="input-span">
              {/* Loan Term Dropdown */}
              <label className="label">Loan Term (Months)</label>
              <select value={term} onChange={handleTermChange} className="stuff">
                <option value={4}>4 Months</option>
                <option value={6}>6 Months</option>
                <option value={12}>12 Months</option>
              </select>
            </span>

            <button type="submit" className="submit">Apply for Loan</button>
          </form>
        </StyledWrapper>
      </div>
    </div>
  );
};



const StyledWrapper = styled.div`
  .form-new {
    --bg-light: #efefef;
    --bg-dark: #707070;
    --clr: #58bc82;
    --clr-alpha: #9c9c9c60;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: 300px;
  }

  .form-new .input-span {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-new input[type="number"],
  .form-new input[type="password"] {
    border-radius: 0.5rem;
    padding: 1rem 0.75rem;
    width: 100%;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--clr-alpha);
    outline: 2px solid var(--bg-dark);
  }

  .stuff {
      border-radius: 0.5rem;
    padding: 1rem 0.75rem;
    width: 100%;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--clr-alpha);
    outline: 2px solid var(--bg-dark);
  }


  .form-new input[type="email"]:focus,
  .form-new input[type="password"]:focus {
    outline: 2px solid var(--clr);
  }

  .label {
    align-self: flex-start;
    color: var(--clr);
    font-weight: 600;
  }

  .form-new .submit {
    padding: 1rem 0.75rem;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 3rem;
    background-color: var(--bg-dark);
    color: var(--bg-light);
    border: none;
    cursor: pointer;
    transition: all 300ms;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .form-new .submit:hover {
    background-color: var(--clr);
    color: var(--bg-dark);
  }

  .span {
    text-decoration: none;
    color: var(--bg-dark);
  }

  .submit {
    text-align: center;
  }

  .span a {
    color: var(--clr);
  }`;

export default LoanDashboard