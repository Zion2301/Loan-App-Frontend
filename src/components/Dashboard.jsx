/* eslint-disable react/prop-types */
import img from "../assets/logo.png";
import "./Dashboard.css";
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
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { useNavigate } from "react-router-dom";
import {  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip} from "recharts";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [loans, setLoans] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setUserName(localStorage.getItem("name"));
    }
  }, [navigate]);

  useEffect(() => {
    const updateDateTime = () => {
      setDate(new Date().toLocaleDateString());
      setTime(new Date().toLocaleTimeString());
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch loan details
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch("https://loan-app-api-production.up.railway.app/api/loans/details", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch loans");
        }
  
        const data = await response.json();
        setLoans(data.loans || []);
  
        // Calculate total loan amount
        const total = data.loans.reduce((sum, loan) => sum + loan.amount, 0);
        setTotalAmount(total);
  
        // Calculate monthly installment for each loan
        const installments = data.loans.map((loan) => {
          const monthlyInstallment = (loan.amount * 1.1) / loan.term;
          return {
            loanId: loan.id, // Assuming each loan has an id
            monthlyInstallment,
          };
        });
        console.log("Monthly Installments: ", installments);
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };
  
    fetchLoans();
  }, []);
  
  const totalPaid = loans.reduce(
    (sum, loan) => sum + loan.payments.reduce((pSum, p) => pSum + p.amount, 0),
    0
  );
  
  const percentagePaid = totalAmount ? (totalPaid / totalAmount) * 100 : 0;
  const percentageNotPaid = 100 - percentagePaid;
  
  const data = [{ name: "Paid", value: percentagePaid, fill: "#28a745" }];
  
  const pieData = [
    { name: "Paid", value: percentagePaid, color: "#28a745" },
    { name: "Not Paid", value: percentageNotPaid, color: "#dc3545" },
  ];
  
  const barData = [
    { name: "Paid", value: percentagePaid },
    { name: "Not Paid", value: percentageNotPaid },
  ];

  return (
    <>
      <div className="main-dashboard">
        <div className="left-dash">
          <img src={img} alt="" className="another-logo" />
          <div className="inner-left-div">
            <div className="dash-links">
              <Link className="ordinary">
                <IoSpeedometer /> Overview
              </Link>
              <Link className="ordinary" to="/loan">
                <FaMoneyBill1Wave /> Apply Loan
              </Link>
              <Link className="ordinary" to="/payment">
                <BsFillCreditCard2FrontFill /> Payment Details
              </Link>
              <Link className="ordinary" to="/paydash">
                <TbCreditCardPay/> Pay
              </Link>
            </div>

            <div className="lower-links">
              <Link className="ordinary" to="/">
                <FaGear /> Settings
              </Link>
              <Link className="ordinary">
                <MdHelpOutline /> Help & Support
              </Link>
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
              <FaRegBell className="alert" />
              <GoPerson className="alert" />
              <p className="welcome">{userName}</p>
            </div>
          </div>

          <h1 className="zee">Welcome Back, {userName}</h1>
          <div className="idk-div">
            <div className="chart-div">
              <p className="current">Current monthly deduction</p>
              <h2 className="amount">₦{loans.length > 0 ? ((loans[0].amount * 1.1) / loans[0].term).toFixed(2) : "100"} +10% interest</h2>

              <RadialBarChart
                width={500}
                height={300}
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={20}
                data={data}
                startAngle={180}
                endAngle={0}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar background dataKey="value" />
              </RadialBarChart>

              <div className="paid-div">
                <h4>{percentagePaid.toFixed(0)}% paid</h4>
                <h2>₦{totalPaid.toLocaleString()}</h2>
              </div>
              <div className="paid-div">
                <h4>Outstanding payment</h4>
                <h3>₦{(totalAmount - totalPaid).toLocaleString()}</h3>
              </div>
            </div>

            <div className="second-chart-div">
            <div className="little">
            <PieChart width={200} height={200}>
              <Pie data={pieData} dataKey="value" cx="60%" cy="50%" outerRadius={60} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="legend">
              {pieData.map((entry, index) => (
                <p key={index} style={{ color: entry.color }}>{entry.name}</p>
              ))}
            </div>
          </div>

          <div className="little">
            <BarChart width={200} height={200} data={barData}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>

          <div className="little">
            <p className="amount-paid">Amount Paid</p>
            <h3 className="actual-shi">{percentagePaid.toFixed(2)}%</h3>
          </div>

          <div className="little">
            <p className="amount-paid">Amount Not Paid</p>
            <h3 className="actual-shi">{percentageNotPaid.toFixed(2)}% </h3>
          </div>
            </div>
          </div>

          <div className="table-container">
            <h2 className="table-title">My Loans</h2>
            <table className="loan-table modern-style">
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Type</th>
                  <th>Amount (₦)</th>
                  <th>Term (Months)</th>
                  <th>Status</th>
                  <th>Paid (₦)</th>
                  <th>Balance (₦)</th>
                  <th>Last Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => {
                  const totalPaid = loan.payments.reduce((sum, p) => sum + p.amount, 0);
                  const balance = loan.amount - totalPaid;
                  const lastPaymentDate = loan.payments.length
                    ? new Date(loan.payments[loan.payments.length - 1].date).toLocaleDateString()
                    : "No Payments";

                  return (
                    <tr key={loan.id}>
                      <td>{loan.id}</td>
                      <td>{loan.type}</td>
                      <td>{loan.amount.toLocaleString()}</td>
                      <td>{loan.term}</td>
                      <td className={`status ${loan.status.toLowerCase()}`}>{loan.status}</td>
                      <td>{totalPaid.toLocaleString()}</td>
                      <td>{balance.toLocaleString()}</td>
                      <td>{lastPaymentDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
