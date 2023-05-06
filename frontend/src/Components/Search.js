import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import StudentTableRow from "./StudentTableRow";
import "./Login.css";
import { Table } from "semantic-ui-react";

function Search() {
  const history = useNavigate();
  const [oneStudent, setOnestudent] = useState({});
  const [rollno, setRollno] = useState("");
  // useEffect(() => {});

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://127.0.0.1:8000/search", { rollno })
        .then((res) => {
          if (res.data === "not existing") {
            alert("Student doesn't exists");
          } else {
            console.log(res.data);
            setOnestudent(res.data);
            console.log("student : ", oneStudent);
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
      <h1>Search Student</h1>
      <form action="POST">
        <label>Roll Number :</label>
        <input
          onChange={(e) => {
            setRollno(e.target.value);
          }}
          placeholder="Roll Number"
          name="rollno"
        />
        <br />
        <br />
        <input type="submit" onClick={submit} />
        <br />
        <br />
      </form>
      <br />
      <br />

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll No</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {oneStudent!=={} &&
            <tr>
              <td>{oneStudent.id}</td>
              <td>{oneStudent.name}</td>
              <td>{oneStudent.rollno}</td>
              <td>{oneStudent.phoneno}</td>
              <td>{oneStudent.college}</td>
              <td>
                {/* <Link
                        to={"editemployee/" + employee._id}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link> */}
              </td>
              <td>
                {/* <Button
                        onClick={() => this.deleteEmployee(employee._id)}
                        bsStyle="danger"
                      >
                        Delete
                      </Button> */}
              </td>
            </tr>
          }
        </tbody>
      </Table>
    </div>
  );
}

export default Search;
