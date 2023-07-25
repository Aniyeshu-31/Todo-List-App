import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword:""
  });
  const host = "http://localhost:5000";
  const { name, email, password, cpassword } = credentials;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/signup`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password,cpassword }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem("token", json.authToken);
      navigate("/login");
      props.showAlert("Account Created successfully","success");
    }
    else{
      props.showAlert("Invalid Credentials","danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2">
      <h2 className={`my-2 text-${(props.mode==='light')?'black':'white'}`}>{props.title}</h2>
      <form onSubmit={handleSubmit}>
        <div className={`mb-3 text-${(props.mode==='light')?'black':'white'}`}>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"           
            id="name"
            name="name"
            value={credentials.Name}
            onChange={onChange}
          />
        </div>
        <div className={`mb-3 text-${(props.mode==='light')?'black':'white'}`}>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className={`mb-3 text-${(props.mode==='light')?'black':'white'}`}>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            minLength={5}
          />
        </div>
        <div className={`mb-3 text-${(props.mode==='light')?'black':'white'}`}>
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            minLength={5} 
          />
        </div>
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
  }
Signup.propTypes=
{
  title:PropTypes.string.isRequired,
}
Signup.defaultProps={
  title:'Create an Account on Todo-List-App',
}
export default Signup;
