import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const StudentTableRow = (props) => {
const { _id, name, rollno, phoneno, college } = props.obj;

return (
	<tr>
	<td>{name}</td>
	<td>{rollno}</td>
    <td>{phoneno}</td>
    <td>{college}</td>
	<td>
		{/* <Link className="edit-link"
		to={"/edit-student/" + _id}>
		Edit
		</Link>
		<Button onClick={deleteStudent}
		size="sm" variant="danger">
		Delete
		</Button> */}
	</td>
	</tr>
);
};

export default StudentTableRow;
