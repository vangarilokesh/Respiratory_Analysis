import React from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate, useState } from "react-router-dom";
import "./MainPage.css";

// ["COPD" ,"Bronchiolitis ", "Pneumoina", "URTI", "Healthy"]

function Details() {
  return (
    <div className="container">
    <div className="mainpage">
      <h1>Disease List and web page Links </h1>
      <ul>
        <li>
          <a href="https://en.wikipedia.org/wiki/Chronic_obstructive_pulmonary_disease">
            <h3>COPD</h3>
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Bronchiolitis">
            <h3>Bronchiolitis</h3>
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Pneumonia">
            <h3>Pneumoina</h3>
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Upper_respiratory_tract_infection">
            <h3>URTI</h3>
          </a>
        </li>
      </ul>
    </div>
    </div>
  );
}

export default Details;
