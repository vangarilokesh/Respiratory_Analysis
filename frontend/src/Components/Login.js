import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8001/", {
          email,
          password,
        })
        .then((res) => {
          if (res.data === "exist") {
            history("/main", { state: { id: email } });
          }
          else if (res.data === "not exist") {
            alert("User has not registered")
          }
        })
        .catch(e=>{
            alert("wrong details")
            console.log(e);
        })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form action="POST">
        <label>Email id : </label>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          name="email"
          id="email"
        />
        <label>Password : </label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          name="password"
          id="password"
        />
        <input type="submit" onClick={submit} />
      </form>
      <p>OR</p>
      <Link to="/signup">SignUp</Link>
    </div>
  );
}

export default Login;
