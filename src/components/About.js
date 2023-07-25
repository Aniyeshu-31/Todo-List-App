import React,{useState} from "react";

export default function About(props) {
    // const[myStyle,setMyStyle]=useState({
    //     color: 'black',
    //     backgroundColor:'white',
    //     borderRadius:'8px'
    // })
    // const[btnText,setBtnText]=useState("EnableLightMode");
    // const ToggleStyle=()=>{
    //     if(myStyle.color==='white'){
    //         setMyStyle({
    //             color:'black',
    //             backgroundColor:'white',
    //             borderRadius:'8px'
    //         })
    //         setBtnText("EnableDarkMode")
    //     }
    //     else{
    //         setMyStyle({
    //             color: 'white',
    //             backgroundColor:'black',
    //             border:'2px solid white',
    //             borderRadius:'8px'
    //         })
    //         setBtnText("EnableLightMode")
    //     }
    // }

    const myStyle = {
      color:props.mode==='dark'?'white':'#192b8a',
      backgroundColor: props.mode ==='dark'?'#192b8a':'white',
      border:'2px solid',
      borderColor: props.mode ==='dark'?'white':'#192b8a',
    }
    const textstyle={
      color:props.mode==='dark'?'white':'black'
    }
  return (
    <div className="container">
      <h1 className="my-3" style={textstyle}>About us</h1>
      <div className="accordion" id="accordionExample">
      <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
              style={myStyle}
            >
            <strong>
              Save Your Notes
              </strong>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              Todo-List gives you a great way to analyze your Notes very efficiently. It also gives you facility to organize your Notes for Future.
            </div>
          </div>
        </div>
      </div>
      <div className="accordion" id="accordionExample">
      <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              style={myStyle}
            >
               <strong>
              Free to use
              </strong>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
            Offer great flexibility. The best to-do list app needs to be neurodiverse and function well no matter how it’s used. You should be able to set priorities (so you know what are important tasks), add tasks and subtasks, and view your tasks in different ways. Remind you of deadlines. You need an app to remind you to get things done.

            </div>
          </div>
        </div>
      </div>
      <div className="accordion" id="accordionExample">
      <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
              style={myStyle}
            >
               <strong>
                Browser Compatible
              </strong>
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
            The Todoist extension is currently available for Google Chrome, Edge, Firefox, Opera, and Safari.
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {/* <button type="button" className="btn btn-primary my-3" onClick={ToggleStyle}>
          {btnText}
        </button> */}
      </div>
    </div>
  );
}