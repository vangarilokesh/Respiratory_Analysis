// import React, { useState, useEffect } from "react";
// import * as tf from '@tensorflow/tfjs';

// var a;

// const AudioPlay = () => {
//   const [buttonName, setButtonName] = useState("Play");
//   const [predict, setPredict] = useState("Predict");
//   const [audio, setAudio] = useState();
//   const [model, setModel] = useState(null);
//   const MODEL_HTTP_URL = "model_wav";
//   const MODEL_INDEXEDDB_URL = "indexeddb://model_wav";
//   async function runModel(){
//     console.log(model);
//     var bufferNewSamples =  new Float32Array(a);
//     //const buffersliced = bufferNewSamples.slice(0,bufferNewSamples .length-(bufferNewSamples .length%9976));
//     const xtensor = tf.tensor(bufferNewSamples).reshape([-1, 52]);
//     const pred = model.predict(xtensor);
//     console.log(pred);
//   }

//   useEffect(() => {
//     if (a) {
//       a.pause();
//       a = null;
//       setButtonName("Play");
//     }
//     if (audio) {
//       a = new Audio(audio);
//       a.onended = () => {
//         setButtonName("Play");
//       };
//     }
//   }, [audio]);

//   useEffect(() => {
//     async function fetchModel() {
//       console.log(fetch(MODEL_HTTP_URL));
//       try {
//         const localClassifierModel = await tf.loadGraphModel(
//           MODEL_INDEXEDDB_URL
//         );

//         setModel(localClassifierModel);
//         console.log("Model loaded from IndexedDB");
//       } catch (e) {
//         try {
//           console.log(57);
//           const classifierModel = await tf.loadLayersModel(MODEL_HTTP_URL);
//           console.log(classifierModel);
//           setModel(classifierModel);
//           console.log("Model Loaded");
//           await classifierModel.save(MODEL_INDEXEDDB_URL);
//           console.log("Model saved to IndexedDB");
//         } catch (e) {
//           console.log("Unable to load model at all: ", e);
//         }
//       }
//     }
//     fetchModel();
//   }, []);

//   const handleClick = () => {
//     if (buttonName === "Play") {
//       a.play();
//       setButtonName("Pause");
//     } else {
//       a.pause();
//       setButtonName("Play");
//     }
//   };

//   const addFile = (e) => {
//     if (e.target.files[0]) {
//       setAudio(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   return (
//     <div>
//       {/* Button for playing audio */}
//       <button onClick={handleClick}>{buttonName}</button>
//       {/* Button for input or upload the audio */}
//       <input type="file" onChange={addFile} />
//       {/* Model run button */}
//       <button onClick={runModel}>{predict}</button>
//     </div>
//   );
// };

// export default AudioPlay;

import React, { useState, useEffect } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import axios from "axios";
import button from "@mui/material/Button";
import "./AudioPlay.css"
var a;
const DropzoneAreaExample = () => {
  const [data, setData] = useState({});
  const [detected, setDetected] = useState();
  const [buttonName, setButtonName] = useState("Play");
  const [audio, setAudio] = useState();
  const [name1, setName1] = useState();

  useEffect(() => {
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
        setDetected((response.data));
        setName1(JSON.stringify(response.data)["disease_lstm"]["prediction"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="style">
      <input type="file" onChange={onFileChange} />
      <br></br>
      <br></br>
      {/* Button for playing audio */}
      <button onClick={handleClick}>{buttonName}</button>
      <br></br>
      <br></br>
      <button onClick={detect}>Upload and Predict!</button>
      {detected && <h3>LSTM_prediction :{detected.disease_lstm.prediction}
      <br></br><br></br><br></br>GRU Prediction: {detected.disease_gru.prediction}</h3>}
      {/* {name1 && <h6>{name1}</h6>} */}
    </div>
  );
};

export default DropzoneAreaExample;
