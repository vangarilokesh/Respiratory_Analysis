import React from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate, useState } from "react-router-dom";
import "./MainPage.css";

function Home() {
  return (
    <div className="container">
      {/* <div className="left-column">
        <p>
          Respiratory analysis using sound and deep learning is a technique that
          uses sound recordings of breath sounds to analyze respiratory patterns
          and diagnose respiratory disorders. This technique is based on the
          fact that different respiratory disorders have distinct breath sound
          patterns that can be identified through machine learning algorithms.
          The process of respiratory analysis using sound and deep learning
          involves several steps: 1. Sound recording: The first step is to
          record the breath sounds of the patient using a stethoscope or a
          microphone. The sounds can be recorded in different positions, such as
          sitting, lying down, or standing. 2. Pre-processing: The recorded
          sounds are pre-processed to remove noise and enhance the signal
          quality. This involves filtering and smoothing the sound waves to
          eliminate unwanted background noise. 3. Feature extraction: The
          pre-processed sounds are analyzed to extract specific features that
          are characteristic of different respiratory disorders. Features can
          include frequency, amplitude, duration, and spectral content. 4.
          Machine learning: The extracted features are used to train a deep
          learning model to classify the respiratory sounds into different
          categories. The model is trained on a large dataset of sound
          recordings that have been labeled with the corresponding respiratory
          disorder. 5. Diagnosis: Once the model is trained, it can be used to
          diagnose respiratory disorders in new patients. The breath sounds of
          the patient are recorded and analyzed using the trained model, which
          provides a diagnosis based on the classification results. Respiratory
          analysis using sound and deep learning has shown promising results in
          the diagnosis of respiratory disorders, such as asthma, chronic
          obstructive pulmonary disease (COPD), and pneumonia. The technique is
          non-invasive, cost-effective, and can be performed in real-time,
          making it a useful tool in clinical practice.
        </p>
      </div> */}
      <div className="mainpage">
        <Link to="/audio">Upload</Link>
        <br></br>
        <br></br>
        <Link to="/details">Details</Link>
      </div>
    </div>
  );
}

export default Home;
