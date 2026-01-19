import { useState } from 'react';
import '../styles/Task.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  async function HandleSubmit(e) {
    e.preventDefault();

    let res = await fetch('http://localhost:3000/api/auth/login' , {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        user : {
          email,
          password
        }
      })
    });

    let data = await res.json();
    
    localStorage.setItem('token' , data['token']);

    navigate("/dashboard");



  }

  return (
    <>
    <div className="form-con">
    <h1>Login</h1>
    <form onSubmit={HandleSubmit}>
      
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
    <p className="Navigation">Don't have an Account ? <Link to="/">Register</Link></p>
    </div>
    </>
  );
}

export default Login;