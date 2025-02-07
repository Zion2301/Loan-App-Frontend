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

const PaymentDetails = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [savedCard, setSavedCard] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for cardNumber and CVV
    if (name === "cardNumber" || name === "cvv") {
      if (!/^\d*$/.test(value)) return;
    }

    setCardDetails({ ...cardDetails, [name]: value });
  };

  // Validate card number using Luhn Algorithm
  const validateCardNumber = (number) => {
    if (!/^\d{13,19}$/.test(number)) return "Invalid card number length";

    let sum = 0;
    let shouldDouble = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0 ? "" : "Invalid card number";
  };

  // Validate expiry date (MM/YY format & future date)
  const validateExpiryDate = (date) => {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(date)) return "Invalid expiry format (MM/YY)";

    const [month, year] = date.split("/").map(Number);
    const currentYear = new Date().getFullYear() % 100; // Get last 2 digits of the year
    const currentMonth = new Date().getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return "Card expired";
    }

    return "";
  };

  // Validate CVV (3 or 4 digits)
  const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv) ? "" : "Invalid CVV";
  };

  // Validate all fields before saving
  const handleSave = () => {
    const errors = {
      cardNumber: validateCardNumber(cardDetails.cardNumber),
      expiryDate: validateExpiryDate(cardDetails.expiryDate),
      cvv: validateCVV(cardDetails.cvv),
    };

    setErrors(errors);
    console.log("Errors:", errors); // Debugging

    if (!errors.cardNumber && !errors.expiryDate && !errors.cvv) {
      setSavedCard({ ...cardDetails });
      console.log("Saved Card:", cardDetails); // Debugging
      alert("Card details saved successfully!");
    }
  };

  return (
    <>
      <div className="main-dashboard">
        <div className="left-dash">
          <img src={img} alt="" className="another-logo" />
          <div className="inner-left-div">
            <div className="dash-links">
              <Link className="ordinary" to="/dashboard"><IoSpeedometer /> Overview</Link>
              <Link className="ordinary" to="/loan"><FaMoneyBill1Wave /> Apply Loan</Link>
              <Link className="special"><BsFillCreditCard2FrontFill /> Payment Details</Link>
              <Link className="ordinary" to="/paydash"><TbCreditCardPay /> Pay</Link>
            </div>

            <div className="lower-links">
              <Link className="ordinary"><FaGear /> Settings</Link>
              <Link className="ordinary"><MdHelpOutline /> Help & Support</Link>
            </div>
          </div>
        </div>

        <div className="right-dash">
          <div>
            <h2>Enter Card Details</h2>

            <label>Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              maxLength="19"
              placeholder="Enter card number"
              value={cardDetails.cardNumber}
              onChange={handleChange}
              className="inputStyle"
            />
            {errors.cardNumber && <p className="errorStyle">{errors.cardNumber}</p>}

            <label>Expiry Date:</label>
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={cardDetails.expiryDate}
              onChange={handleChange}
              className="inputStyle"
            />
            {errors.expiryDate && <p className="errorStyle">{errors.expiryDate}</p>}

            <label>CVV:</label>
            <input
              type="text"
              name="cvv"
              maxLength="4"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={handleChange}
              className="inputStyle"
            />
            {errors.cvv && <p className="errorStyle">{errors.cvv}</p>}

            <button onClick={handleSave} className="buttonStyle">
              Save
            </button>

            {/* Display saved card details */}
            {savedCard && (
              <div className="savedCard">
                <h1>Saved Card</h1>
                <p><strong>Card Number:</strong> {savedCard.cardNumber}</p>
                <p><strong>Expiry Date:</strong> {savedCard.expiryDate}</p>
                <p><strong>CVV:</strong> {savedCard.cvv}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
