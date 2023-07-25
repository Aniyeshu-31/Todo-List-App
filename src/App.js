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
  const[myColor,setColorbtn]=useState({
    color:'white',
  });
  const[mode,setMode]=useState('light'); //Whether darkMode is Enabled or not
  const[btnText,setBtnText]=useState('EnableDarkMode');
  const toggleMode=()=>{
    if(mode==='light'){
      setMode('dark');
      setBtnText('EnableLightMode');
      setColorbtn({
        color:'white'
      });
      document.body.style.backgroundColor='#18314A';
      showAlertMessage("Dark Mode has been Enabled","success");
    }
    else{
      setMode('light');
      setBtnText('EnableDarkMode');
      setColorbtn({
        color:'white',
      })
      document.body.style.backgroundColor='white';
      showAlertMessage("Light Mode has been Enabled","success");
    }
  
  }
  return (
    <>
      <NoteState>
      
        <BrowserRouter>
          <Navbar title="Todo-List App" aboutText="About us" mode={mode} toggleMode={toggleMode} btnText={btnText} myStyle={myColor} />
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
