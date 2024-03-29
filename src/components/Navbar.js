import React , {useEffect} from "react";
import {Link ,useNavigate, useLocation} from "react-router-dom";
const Navbar = (props) => {
  let location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(location.path);
  }, [location]);
  const handleClicklogout=()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Todo-List-App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.path==='/'?"active":''}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.path==='/about'?"active":''}`} aria-current="page" to="/about">
                  About
              </Link>
            </li>
          </ul>
            {!localStorage.getItem('token')?(<form className="d-flex">
            <Link to="/logIn" className="btn btn-primary mx-1" role="button">LogIn</Link>
            <Link to="/SignUp" className="btn btn-primary mx-1" role="button">SignUp</Link>
            </form>):<button className="btn btn-primary" onClick={handleClicklogout}>Logout</button>}
            <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.toggleMode}/>
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={props.myStyle}>{props.btnText}</label>
      </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
