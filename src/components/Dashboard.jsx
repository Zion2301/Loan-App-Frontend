/* eslint-disable react/prop-types */
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
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
const Dashboard = ({loans = []}) => {
    const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const totalAmount = 1000000; // 1 million
        const paidAmount = 750000; // 750k
        const percentagePaid = (paidAmount / totalAmount) * 100;
      
        const data = [{ name: "Paid", value: percentagePaid, fill: "#28a745" }];
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
             
             <h1 className="zee">Welcome Back, Zion</h1>
             <div className="idk-div">
             <div className="chart-div">
               <p className="current">Current monthly deduction</p>
               <h2 className="amount">$100</h2>

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
     <h2>₦{paidAmount.toLocaleString()}</h2>
     </div>
      <div className="paid-div">
      <h4>Outstanding payment</h4>
      <h3>₦{(totalAmount - paidAmount).toLocaleString()}</h3>
      </div>
            </div>

            <div className="second-chart-div">
                <div className="little">
                    <Link className="pretty">Make a Loan Payment</Link>
                </div>

                <div className="little">
                    <Link className="pretty">See Payment Options</Link>
                </div>

                <div className="little">
                    <Link className="pretty">Loan Applications</Link>
                </div>

                <div className="little">
                    <Link className="pretty">Apply for a new loan</Link>
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
  )
}

export default Dashboard