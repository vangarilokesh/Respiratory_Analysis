import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function SignUp() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8001/signup", {
          email,
          name,
          phoneno,
          password,
        })
        .then((res) => {
          if (res.data === "already exist") {
            alert("User already exists");
          } else if (res.data === "added") {
            history("/main", { state: { id: email } });
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login">
      <h1>SignUp</h1>
      <form action="POST">
        <label>Email id</label>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          name="email"
          id="email"
        />
        <label>Name</label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
          name="name"
          id="name"
        />
        <label>Phone Number</label>
        <input
          type="text"
          onChange={(e) => {
            setPhoneno(e.target.value);
          }}
          placeholder="Phone Number"
          name="phoneno"
          id="phoneno"
        />
        <label>Password</label>
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
      <Link to="/">Login</Link>
    </div>
  );
}

export default SignUp;
