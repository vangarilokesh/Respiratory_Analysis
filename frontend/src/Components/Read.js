import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { Table } from "semantic-ui-react";
import StudentTableRow from "./StudentTableRow";

// function Read() {
//   const history = useNavigate();

//   const [name, setName] = useState("");
//   const [rollno, setRollno] = useState("");
//   const [phoneno, setPhoneno] = useState("");
//   const [college, setCollege] = useState("");
//   var arr;

//   async function submit(e) {
//     e.preventDefault();

//     try {
//       await axios
//         .get("http://127.0.0.1:8000/read")
//         .then((res) => {
//           console.log(res);
//           arr = res;
//         })
//         .catch((e) => {
//           alert("wrong details Read-24");
//           console.log(e);
//         });
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   return (
//     <div className="login">
//       <h1>Read Student DB</h1>
//       <form action="GET">
//         <Table.Body>
//           {arr.map((data) => {
//             return (
//               <Table.Row>
//                 <Table.Cell>{data.name}</Table.Cell>
//                 <Table.Cell>{data.rollno}</Table.Cell>
//                 <Table.Cell>{data.phoneno}</Table.Cell>
//                 <Table.Cell>{data.college}</Table.Cell>
//               </Table.Row>
//             );
//           })}
//         </Table.Body>
//         <input type="submit" onClick={submit} />
//         <br />
//         <br />
//       </form>
//       <br />
//       <br />
//     </div>
//   );
// }

function Read() {
  const [student, setStudent] = useState([]);
  var arr = [];
  let i = 0;
  useEffect(()=>{
    try {
      axios
        .get("http://127.0.0.1:8000/read")
        .then((res) => {
          if (res === "error in reading from db") {
            document.getElementById("student").innerHTML = "ERROR";
          } else {
            console.log(res.data);
            arr.push(res.data);
            setStudent(res.data);
            console.log(student);
          }
        })
        .catch((e) => {
          alert("wrong details Read-24");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  },[])

  const DataTable = () => {
    return arr.map((res, i) => {
      return <StudentTableRow obj={res} key={i} />;
    });
  };
  return (
    <div className="table-wrapper">
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll No</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* <tbody>{DataTable()}</tbody> */}
        <tbody>{
              student.map((s, i) => {
                return (
                  <tr key={i}>
                    <td>{i}</td>
                    <td>{s.name}</td>
                    <td>{s.rollno}</td>
                    <td>{s.phoneno}</td>
                    <td>{s.college}</td>
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
                )
              })}
          </tbody>
      </Table>
    </div>
  );
}

export default Read;

// import React, { Component } from "react";
// import axios from 'axios';
// import Table from 'react-bootstrap/Table';
// import StudentTableRow from './StudentTableRow';

// export default class StudentList extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       students: []
//     };
//   }
//   componentDidMount() {
//     axios.get('http://127.0.0.1:8000/read')
//       .then(res => {
//         this.setState({
//           students: res.data,
//         });
//         console.log(this.students);
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//   }
//   DataTable() {
//     console.log(typeof(this.students));
//     return this.state.students.map((res, i) => {
//       return <StudentTableRow obj={res} key={i} />;
//     });
//   }

//   render() {
//     return (<div className="table-wrapper">
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Roll No</th>
//             <th>Phoneno</th>
//             <th>College</th>
//           </tr>
//         </thead>
//         <tbody>
//           {this.DataTable()}
//         </tbody>
//       </Table>
//     </div>);
//   }
// }

// import React, { Component } from "react";
// import axios from "axios";
// import { Table, Button } from "react-bootstrap";
// // To use routing functionalities
// import { Link } from "react-router-dom";

// var divStyle = {
//   margin: "8% 8%",
// };

// class Student{
//   name;
//   rollno;
//   phoneno;
//   college;
// }

// class ListEmployee extends Component {
//   constructor(props) {
//     super(props);
//     this.student = new Student();
//     this.state = {students: this.student.conversations};
//     console.log(this.students);
//     // this.deleteEmployee = this.deleteEmployee.bind(this);
//   }

//   componentDidMount = () => {
//     this.getStudentList();
//   };

//   // To get all the employees
//   getStudentList() {
//     axios
//       .get("http://127.0.0.1:8000/read")
//       .then((response) => {
//         console.log(response);
//         this.setState({
//           students: response,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   // To delete any employee
//   // deleteEmployee(empid) {
//   //   this.employeeService.deleteEmployee(empid);
//   //   this.getEmployeeList();
//   // }

//   render() {
//     const { students } = this.state;
//     return (
//       <div style={divStyle}>
//         <Table responsive>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Rollno</th>
//               <th>Phoneno</th>
//               <th>College</th>
//               <th></th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {students &&
//               students.map((student, i) => {
//                 return (
//                   <tr key={i}>
//                     <td>{i}</td>
//                     <td>{student.name}</td>
//                     <td>{student.rollno}</td>
//                     <td>{student.phoneno}</td>
//                     <td>{student.college}</td>
//                     <td>
//                       {/* <Link
//                         to={"editemployee/" + employee._id}
//                         className="btn btn-primary"
//                       >
//                         Edit
//                       </Link> */}
//                     </td>
//                     <td>
//                       {/* <Button
//                         onClick={() => this.deleteEmployee(employee._id)}
//                         bsStyle="danger"
//                       >
//                         Delete
//                       </Button> */}
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </Table>
//       </div>
//     );
//   }
// }

// export default ListEmployee;