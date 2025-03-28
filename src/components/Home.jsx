import "./Home.css"
import Navbar from "./Navbar"
import calculate from "../assets/calculate.png"
import { IoPersonSharp } from "react-icons/io5";
import { VscSymbolProperty } from "react-icons/vsc";
import { FaPercent } from "react-icons/fa";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Footer from "./Footer";
const Home = () => {


    
  return (
    <>
     <Navbar/>
     <section className="banner-img">
       <div className="inner-div">
          <h1 className="need"><span className="part">Need quick cash for that </span><br></br>URGENT Need?</h1>
          <img src={calculate} alt="" className="calculate" />
       </div>
     </section>

     <section className="easiest">
        <div className="inner-blue">
            <div className="left-div">
                <h1 className="way">easiest way to <br></br> <span className="loan">LOAN Money</span></h1>
                <p className="text">FastMoney™ is an innovative personal lending platform created to connect<br></br> people with their dreams by providing finance and financial resources that is<br></br> easily accessible and affordable.</p>
            </div>

            <div className="right-div">
                <IoPersonSharp className="person"/>
                <p className="number">3000</p>
                <p className="customers">Customers</p>
            </div>
        </div>
     </section>

     <section className="new-section">
        <div className="each-lil-div">
           <VscSymbolProperty className="coll"/>
           <h1 className="collateral">Collateral-Free Loan</h1>
           <p className="more">You do not require any physical collateral in order to access a loan facility from us.</p>
        </div>

        <div className="each-lil-div">
           <FaPercent className="coll"/>
           <h1 className="collateral">Competitive Rate</h1>
           <p className="more">The interest rate at which the loan is provided is HIGHLY competitive.</p>
        </div>

        <div className="each-lil-div">
           <BsCreditCard2FrontFill className="coll"/>
           <h1 className="collateral">Repayment Options</h1>
           <p className="more">We have flexible repayment options that you can choose from to make paying back easy.</p>
        </div>

        <div className="each-lil-div">
           <FaHeart className="coll"/>
           <h1 className="collateral">Cash Back</h1>
           <p className="more">If you dont miss a payment or default on your loan, you get cash back from us upon tenure completion.</p>
        </div>
     </section>

     <Footer/>
    </>
  )
}

export default Home