import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import img from "../assets/logo.png";
import "./Dashboard.css";
import { IoSpeedometer } from "react-icons/io5";
import { FaMoneyBill1Wave, FaGear } from "react-icons/fa6";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { TbCreditCardPay } from "react-icons/tb";
import { MdHelpOutline } from "react-icons/md";

const PaymentDetails = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [savedCard, setSavedCard] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchSavedCard();
  }, []);

  const fetchSavedCard = async () => {
    try {
      const savedCardData = localStorage.getItem("savedCard");
  
      if (savedCardData) {
        setSavedCard(JSON.parse(savedCardData));
        return; // Avoid unnecessary API call
      }
  
      const token = localStorage.getItem("token");
      if (!token) return;
  
      const response = await axios.get("http://localhost:5000/api/payment-cards/details", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200 && response.data) {
        setSavedCard(response.data);
        localStorage.setItem("savedCard", JSON.stringify(response.data)); // Store fetched data
      }
    } catch (error) {
      console.error("Error fetching saved card:", error);
    }
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
    const currentYear = new Date().getFullYear() % 100;
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

  // Save card details
  const handleSave = async () => {
    const errors = {
      cardNumber: validateCardNumber(cardDetails.cardNumber),
      expiryDate: validateExpiryDate(cardDetails.expiryDate),
      cvv: validateCVV(cardDetails.cvv),
    };

    setErrors(errors);

    if (!errors.cardNumber && !errors.expiryDate && !errors.cvv) {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          Swal.fire({
            icon: "warning",
            title: "No Token Found!",
            text: "Please log in again.",
            confirmButtonColor: "#d33",
          });
          return;
        }

        const response = await axios.post(
          "http://localhost:5000/api/payment-cards/add",
          {
            cardNumber: cardDetails.cardNumber,
            expiryDate: cardDetails.expiryDate,
            cvv: cardDetails.cvv,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setSavedCard({ ...cardDetails });
          localStorage.setItem("savedCard", JSON.stringify(cardDetails));

          Swal.fire({
            icon: "success",
            title: "Card Saved!",
            text: "Your payment details were added successfully.",
            confirmButtonColor: "#3085d6",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: response.data.message || "Something went wrong. Please try again.",
            confirmButtonColor: "#d33",
          });
        }
      } catch (error) {
        console.error("Error saving card:", error);

        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.response?.data?.message || "Unable to connect to the server.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
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
            <Link className="ordinary" to="/"><FaGear /> Settings</Link>
            <Link className="ordinary"><MdHelpOutline /> Help & Support</Link>
          </div>
        </div>
      </div>

      <div className="right-dash">
        <h2>Enter Card Details</h2>

        <label>Card Number:</label>
        <input
          type="text"
          name="cardNumber"
          maxLength="19"
          placeholder="Enter card number"
          value={cardDetails.cardNumber}
          onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
          className="inputStyle"
        />
        {errors.cardNumber && <p className="errorStyle">{errors.cardNumber}</p>}

        <label>Expiry Date:</label>
        <input
          type="text"
          name="expiryDate"
          placeholder="MM/YY"
          value={cardDetails.expiryDate}
          onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
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
          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
          className="inputStyle"
        />
        {errors.cvv && <p className="errorStyle">{errors.cvv}</p>}

        <button onClick={handleSave} className="buttonStyle">
          Save
        </button>

        {savedCard ? (
          <div className="savedCard">
            <h1>Saved Card</h1>
            <p><strong>Card Number:</strong> {savedCard.cardNumber}</p>
            <p><strong>Expiry Date:</strong> {savedCard.expiryDate}</p>
          </div>
        ) : (
          <p>No saved card found.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;
