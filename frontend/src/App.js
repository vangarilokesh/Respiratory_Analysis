import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/SignUp";
import Home from "./Components/Home"
import MainPage from "./Components/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AudioPlay from "./Components/AudioPlay";
import Details from "./Components/Details"
import AudioPage from "./Components/AudioPage"
import Header from "./Components/Header";
function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/upload" element={<AudioPlay/>}></Route>
          <Route path="/main" element={<MainPage/>}></Route>
          <Route path="/audio" element={<AudioPage/>}></Route>
          <Route path="/details" element={<Details/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
