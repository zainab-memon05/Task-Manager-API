import { useState } from "react";
import '../styles/Task.css';
import {Link} from "react-router-dom";
import Header from "./Header";


function Register() {

  const [fullName , setFullName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  function changeFullName(e) {
    setFullName(e.target.value);
  }

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  
  function changePassword(e) {
    setPassword(e.target.value);
  }

 async function handleSubmit(e) {
  e.preventDefault();

  const res = await fetch('http://localhost:3000/api/auth/register', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user : {
      name : fullName,
      email,
      password,
      }
    }),
  });

  const data = await res.json();
  console.log(data);
}


  return (
    <>
    <div className="form-con">
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <div>
      <label htmlFor="name">Full Name : </label>
      <input type="text" placeholder="Enter your full name" value={fullName} onChange={changeFullName} id="name" name="name" className="form-input" />
      </div>
      
      <div>
      <label htmlFor="email">Email : </label>
      <input type="email" placeholder="Enter Your Email" value={email} onChange={changeEmail} id="email" name="email" className="form-input" />
      </div>

      <div>
      <label htmlFor="password">Password : </label>
      <input type="password" placeholder="Enter Your Password" value={password} onChange={changePassword} id="password" name="password" className="form-input" />
      </div>

      <button className="form-btn">Submit</button>
    </form>
    <p className="Navigation">Already have an Account ? <Link to="/login">Login</Link></p>
    </div>
    </>
  );
}


export default Register;