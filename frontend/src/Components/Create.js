import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Create() {
  const history = useNavigate();

  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [college, setCollege] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://127.0.0.1:8000/create", {
          name,
          rollno,
          phoneno,
          college,
        })
        .then((res) => {
            console.log("Line 26 Create.js");
            if (res.data === "already exist") {
              alert("Student already exists");
            } else if (res.data === "added") {
            console.log("added");
              history("/read", { state: { id: name } });
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
      <h1>Create Student</h1>
      <form action="POST">
        <label>Name : </label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
          name="name"
          id="name"
        />
        <br/><br/>
        <label>Roll Number :</label>
        <input
          type="text"
          onChange={(e) => {
            setRollno(e.target.value);
          }}
          placeholder="Roll Number"
          name="rollno"
          id="rollno"
        />
        <br/><br/>
        <label>Phone Number :</label>
        <input
          type="text"
          onChange={(e) => {
            setPhoneno(e.target.value);
          }}
          placeholder="Phone Number"
          name="phoneno"
          id="phoneno"
        />
        <br/><br/>
        <label>College :</label>
        <input
          type="text"
          onChange={(e) => {
            setCollege(e.target.value);
          }}
          placeholder="College"
          name="college"
          id="college"
        />
        <br/><br/>
        <input type="submit" onClick={submit} />
        <br/><br/>
      </form>
      <br /><br/>
    </div>
  );
}

export default Create;
