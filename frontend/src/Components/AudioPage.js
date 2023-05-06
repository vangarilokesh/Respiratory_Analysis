import React, { useState, useEffect } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import axios from "axios";
import button from "@mui/material/Button";
import "./AudioPlay.css";
import Card from "./Card";
var a;
const AudioPage = () => {
  const [data, setData] = useState({});
  const [detected, setDetected] = useState();
  const [buttonName, setButtonName] = useState("Play");
  const [audio, setAudio] = useState();
  const [name1, setName1] = useState();

  useEffect(() => {
    setDetected(null);
    if (a) {
      a.pause();
      a = null;
      setButtonName("Play");
    }
    if (audio) {
      a = new Audio(audio);
      a.onended = () => {
        setButtonName("Play");
      };
    }
  }, [audio]);

  const handleClick = () => {
    if (buttonName === "Play") {
      a.play();
      setButtonName("Pause");
    } else {
      a.pause();
      setButtonName("Play");
    }
  };

  // const addFile = (e) => {
  //   if (e.target.files[0]) {
  //     setAudio(URL.createObjectURL(e.target.files[0]));
  //   }
  // };

  var onFileChange = (event) => {
    setDetected(null);
    setData(event.target.files[0]);
    if (event.target.files[0]) {
      setAudio(URL.createObjectURL(event.target.files[0]));
    }
  };

  const headers = {
    "content-type": "multipart/form-data",
  };

  const detect = () => {
    const formData = new FormData();
    formData.append("file", data);
    var config = {
      method: "post",
      url: " http://localhost:8000/object-to-json",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setDetected(response.data);
        setName1(JSON.stringify(response.data)["disease_lstm"]["prediction"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container">
    <div class="style">
      <input type="file" onChange={onFileChange} />
      <br></br>
      <br></br>
      {/* Button for playing audio */}
      <button onClick={handleClick}>{buttonName}</button>
      <br></br>
      <br></br>
      <button onClick={detect}>Upload and Predict!</button>
      <br></br><br></br>
      {/* {name1 && <h6>{name1}</h6>} */}
    </div>
    <div className="detected">
    {detected && (
        <>
        <Card name={"LSTM"} detected_disease={detected.disease_lstm} />

        <Card name={"GRU"} detected_disease={detected.disease_gru} />
        </>
        // <h3>
        //   LSTM_prediction :{detected.disease_lstm.prediction}
        //   <br></br>
        //   <br></br>
        //   <br></br>GRU Prediction: {detected.disease_gru.prediction}
        // </h3>
      )}
      </div>
    </div>
  );
};

export default AudioPage;
