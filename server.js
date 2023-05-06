const express = require("express");
const mongoose = require("mongoose");
// const studentdb =require("./studentdb")
// const collection =require("./mongoose")
const cors = require("cors");

const app = express();
app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const path = require("path");

mongoose
  .connect("mongodb+srv://lokesh:qwerty56@cluster0.yhoanuy.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("mongodb-login connected");
  })
  .catch(() => {
    console.log("failed");
  });

const newSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const newStudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  rollno: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("collection", newSchema);

const studentdb = mongoose.model("studentdb", newStudentSchema);

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await collection.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("not exist");
    }
  } catch (e) {
    res.json("not exist with error");
  }
});

app.post("/signup", async (req, res) => {
  const { email, name, phoneno, password } = req.body;

  const data = {
    email: email,
    name: name,
    phoneno: phoneno,
    password: password,
  };

  try {
    const check = await collection.findOne({ email: email });
    if (check) {
      res.json("already exist");
    } else {
      await collection.insertMany([data]);
      res.json("added");
    }
  } catch (e) {
    res.json("not exist with error");
  }
});

app.post("/create", async (req, res) => {
  const { name, rollno, phoneno, college } = req.body;

  const data = {
    name: name,
    rollno: rollno,
    phoneno: phoneno,
    college: college,
  };

  try {
    //console.log("Line 117 server.js");
    const check = await studentdb.findOne({ rollno: rollno });
    if (check) {
      //console.log(check);
      res.json("already exist");
    } else {
      await studentdb.insertMany([data]);
      res.json("added");
    }
  } catch (e) {
    res.json("not exist with error");
  }
});

app.get("/read", async (req, res) => {
  try {
    //console.log("134");
    const arr=await studentdb.find();
    res.json(arr);
  } catch (e) {
    console.log(e);
    res.json("error in reading from db");
  }
});

app.post("/update", async (req, res) => {
  const { name, rollno, phoneno, college } = req.body;

  const data = {
    name: name,
    rollno: rollno,
    phoneno: phoneno,
    college: college,
  };
  try {
    console.log("149");
    const check = await studentdb.findOne({ rollno: rollno });
    if (check) {
      await studentdb.updateOne(
        { rollno: rollno },
        {
          name: name,
          phoneno: phoneno,
          college: college,
        }
      );
      res.json("updated");
    } else {
      await studentdb.insertMany([data]);
      res.json("added");
    }
  } catch (e) {}
});

app.post("/delete", async (req, res) => {
  const { rollno } = req.body;

  try {
    console.log("172");
    const check = await studentdb.findOne({ rollno: rollno });
    if (check) {
      console.log(check);
      await studentdb.deleteOne({ rollno: rollno });
      res.json("deleted");
    } else {
      res.json("not existing");
    }
  } catch (e) {}
});

app.post("/search", async(req,res)=>{
  console.log(req.body);
  const { rollno } = req.body;
  try {
    console.log(rollno);
    const check = await studentdb.findOne({ rollno: rollno });
    if (check!=null) {
      console.log(check);
      res.json(check);
    } else {
      res.json("not existing");
    }
  } catch (e) {}
})

app.use(
  "/model_wav",
  express.static(path.join(__dirname, "/Model_WAV/model.json"))
);


app.listen(8001, () => {
  console.log("running backend at 8001");
});
