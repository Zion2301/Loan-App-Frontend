import "./Dashboard.css"
import { IoSpeedometer } from "react-icons/io5";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { TbCreditCardPay } from "react-icons/tb";
import { FaGear } from "react-icons/fa6";
import { MdHelpOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import img from "../assets/logo.png"
import styled from 'styled-components';
import { useState } from "react";
const LoanDashboard = () => {
  const [loanType, setLoanType] = useState("personal");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  // Loan type price ranges
  const loanLimits = {
    personal: { min: 50000, max: 500000 },
    business: { min: 500000, max: 5000000 },
    education: { min: 100000, max: 2000000 },
  };

  // Handle loan type change
  const handleLoanTypeChange = (e) => {
    setLoanType(e.target.value);
    setAmount(""); // Reset amount when loan type changes
    setError(""); // Clear any previous errors
  };

  // Handle amount change
  const handleAmountChange = (e) => {
    const value = parseInt(e.target.value, 10) || "";
    setAmount(value);

    // Validate amount
    if (value && (value < loanLimits[loanType].min || value > loanLimits[loanType].max)) {
      setError(`Amount must be between ₦${loanLimits[loanType].min.toLocaleString()} and ₦${loanLimits[loanType].max.toLocaleString()}`);
    } else {
      setError("");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || amount < loanLimits[loanType].min || amount > loanLimits[loanType].max) {
      setError(`Amount must be between ₦${loanLimits[loanType].min.toLocaleString()} and ₦${loanLimits[loanType].max.toLocaleString()}`);
      return;
    }

    alert(`Loan application submitted for ₦${amount.toLocaleString()} (${loanType})`);
  };
  return (
    <>
      <div className="main-dashboard">
        <div className="left-dash">
        <img src={img} alt="" className="another-logo"/>
            <div className="inner-left-div">
            <div className="dash-links">
               <Link className="ordinary"><IoSpeedometer/> Overview</Link>
               <Link className="special"><FaMoneyBill1Wave/> Apply Loan</Link>
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
        <StyledWrapper>
        <form className="form" onSubmit={handleSubmit}>
      <span className="input-span">
        <label htmlFor="amount" className="label">Amount</label>
        <input 
          type="number" 
          name="amount" 
          id="amount" 
          className="amount" 
          value={amount} 
          onChange={handleAmountChange} 
          placeholder={`₦${loanLimits[loanType].min.toLocaleString()} - ₦${loanLimits[loanType].max.toLocaleString()}`}
        />
        {error && <p className="error">{error}</p>}
      </span>

      <span className="input-span">
        <label htmlFor="loanType" className="label">Type</label>
        <select 
          name="loanType" 
          id="loanType" 
          className="select" 
          value={loanType} 
          onChange={handleLoanTypeChange}
        >
          <option value="personal">Personal (₦50,000 - ₦500,000)</option>
          <option value="business">Business (₦500,000 - ₦5,000,000)</option>
          <option value="education">Education (₦100,000 - ₦2,000,000)</option>
        </select>
      </span>

      <span className="input-span">
        <label htmlFor="loanTerm" className="label">Term</label>
        <select name="loanTerm" id="loanTerm" className="select">
          <option value="4 Months">4 Months</option>
          <option value="6 Months">6 Months</option>
          <option value="12 Months">12 Months</option>
          <option value="24 Months">24 Months</option>
        </select>
      </span>
      
      <button className="submit" type="submit">Apply for Loan</button>
    </form>
    </StyledWrapper>
        </div>
      </div>
    </>
  )
}

const StyledWrapper = styled.div`
  .form {
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

  .form .input-span {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form input[type="email"],
  .form input[type="password"] {
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

  .form input[type="email"]:focus,
  .form input[type="password"]:focus {
    outline: 2px solid var(--clr);
  }

  .label {
    align-self: flex-start;
    color: var(--clr);
    font-weight: 600;
  }

  .form .submit {
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

  .form .submit:hover {
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