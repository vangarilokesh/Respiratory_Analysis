import React from "react";
function Home() {
  // const [student, setStudent] = useState("");

  // async function submit(e) {
  //   e.preventDefault();

  //   try {
  //     await axios
  //       .get("http://127.0.0.1:8000/read")
  //       .then((res) => {
  //         console.log(res);
  //         arr = res.data;
  //         console.log(arr.data);
  //       })
  //       .catch((e) => {
  //         alert("wrong details Read-24");
  //         console.log(e);
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  return (
    <div className="homepage">
      <nav>
        <ul>
          <li><a href="/create">Create</a></li>
          <li><a href="/read">Read</a></li>
          <li><a href="/update">Update</a></li>
          <li><a href="/delete">Delete</a></li>
          <li><a href="/search">Search</a></li>
          <li><a href="/upload">Upload</a></li>
          <li><a href="/temp">Temp</a></li>
        </ul>
      </nav>

    </div>
  );
}

export default Home;
