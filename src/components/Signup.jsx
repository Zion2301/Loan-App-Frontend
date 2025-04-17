import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
   
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("https://loan-app-api-production.up.railway.app/api/users/register", formData, {
        withCredentials: true, // Required for CORS with credentials
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("userId", res.data.user.id);
      
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have successfully signed up!",
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
    setLoading(false);
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>Name</label>
        </div>
        <div className="inputForm">
          <input 
            type="text" 
            name="name"
            className="input" 
            placeholder="Enter your Name" 
            required 
            onChange={handleChange}
          />
        </div>

        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <input 
            type="email" 
            name="email"
            className="input" 
            placeholder="Enter your Email" 
            required 
            onChange={handleChange}
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <input 
            type="password" 
            name="password"
            className="input" 
            placeholder="Enter your Password" 
            required 
            onChange={handleChange}
          />
        </div>

        <button className="button-submit" type="submit" disabled={loading}>{loading ? "Signing You Up...." : "Sign Up"}</button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    border: 1px solid grey;
    margin-left: 500px;
    margin-top: 200px;     
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
`;

export default Signup;
