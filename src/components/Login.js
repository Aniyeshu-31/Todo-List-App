import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const host = "http://localhost:5000";
  const handleSubmit = async (e) => { 
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success === true) {
      // redirect
      //  console.log('hello');
      localStorage.setItem("token", json.authToken);
      props.showAlert("loggedIn successfully","success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials","danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-3">
      <h2 className={`my-2 text-${(props.mode==='light')?'black':'white'}`}>{props.title}</h2>
      <form onSubmit={handleSubmit} className="mt-2">
        <div className="mb-3">
          <label htmlFor="email" className={`form-label  text-${(props.mode==='light')?'black':'white'}`}>
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className={`form-label  text-${(props.mode==='light')?'black':'white'}`}>
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          logIn
        </button>
      </form>
    </div>
  );
};
Login.propTypes=
{
  title:PropTypes.string.isRequired,
}
Login.defaultProps={
  title:'Login To Todo-List App',
}

export default Login;
