import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/Notes/NotesState";
import Login from "./components/Login";
import Signup from "./components/signup"
import ALert from "./components/ALert";
import React,{useState} from "react";
function App() {
  const[alert,setAlert]=useState(null);
  const showAlertMessage=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)
  }
  return (
    <>
      <NoteState>
      
        <BrowserRouter>
          <Navbar />
          <ALert alert={alert}/>
          <div className="container">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <>
                    <Home showAlert={showAlertMessage}/>
                  </>
                }
              />
              <Route
                exact
                path="/about"
                element={
                  <>
                    <About />
                  </>
                }
              />
              <Route
                exact
                path="/login"
                element={
                  <>
                    <Login showAlert={showAlertMessage}/>
                  </>
                }
              />
              <Route
                exact
                path="/signup"
                element={
                  <>
                    <Signup showAlert={showAlertMessage}/>
                  </>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
