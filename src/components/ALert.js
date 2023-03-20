import React from 'react'

function Alert(props) {
    const capitalize=(word)=>{
      if(word==="danger"){
        word="Error";
      }
     const lower=word.toLowerCase();
     return lower.charAt(0).toUpperCase()+lower.substring(1,lower.length);
    }
  return (
        // Important Syntax to remember
        <div style={{height: '50px'}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert" style={{width:'1550px',height:'50px'}}>
           <strong>
            {capitalize(props.alert.type)+" "}
            </strong>:<span>{" "}</span>{props.alert.msg}  
        </div>}   
        </div>
  )
}

export default Alert