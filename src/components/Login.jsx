import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useState } from 'react';
const Login = () => {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://loan-app-api-production.up.railway.app/api/users/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      Swal.fire({
              icon: "success",
              title: "Login Successful",
              text: "You have successfully Logged In!",
            }).then(() => {
              navigate("/dashboard");
            });
      
    } catch (err) {
     Swal.fire({
             icon: "error",
             title: "Login Failed",
             text: err.response?.data?.message || "Something went wrong. Please try again.",
           });
    }
  };
  return (  
     <>
       <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className="inputForm">
          <input type="email" className="input" placeholder="Enter your Email" required onChange={handleChange} name='email'/>
        </div>
        <div className="flex-column">
          <label>Password </label>
        </div>
        <div className="inputForm">
          <input type="password" className="input" placeholder="Enter your Password" required onChange={handleChange} name='password'/>
        </div>
        <button className="button-submit" type='submit'>Login</button>
        {/* <p className="p">Already have a account? <span className="span">login</span></p> */}
        <div className="flex-row">
        </div>
      </form>
    </StyledWrapper>
     </>
  )
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      border: 1px solid grey;
      margin-left: 500px;
      margin-top: 200px;     
  }

  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 85%;
    height: 100%;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .button-submit:hover {
    background-color: #252727;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid #2d79f3;
  }`;

export default Login