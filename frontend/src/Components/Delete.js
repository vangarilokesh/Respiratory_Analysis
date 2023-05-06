import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Update() {
  const history = useNavigate();
  const [rollno, setRollno] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://127.0.0.1:8000/delete", {
          rollno,
        })
        .then((res) => {
          if (res.data === "deleted") {
            alert("Deleted");
            history("/read");
          } else if (res.data === "not existing") {
            alert("Delete Faild");
            history("/read");
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
      <h1>Delete Student</h1>
      <form action="POST">
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
        <br />
        <br />
        <input type="submit" onClick={submit} />
        <br />
        <br />
      </form>
      <br />
      <br />
    </div>
  );
}

export default Update;