import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../Firebase';
import { toast } from 'react-toastify';

export default function SeniorHeader() {
  const nav=useNavigate()
  const logout = async () => {
    if (window.confirm("Do you really want to logout?")) {
      auth.signOut();
      sessionStorage.clear();
      toast.success("Logout successfully");
      nav("/login");
    }
    else{
      nav('/')
    }
  };
  const userId = sessionStorage.getItem("userId");
  const specialization=sessionStorage.getItem("Specialization")
  const naviagteChat=()=>{
    if(specialization==="Web Development"){
      nav("/senior/webdevchat")
    }
    else if(specialization==="App Development"){
      nav("/senior/appdevchat")
    }
    else if(specialization==="Cybersecurity"){
      nav("/senior/cyberchat")
    }
    else if(specialization==="Data Science"){
      nav("/senior/datascichat")
    }
    else if(specialization==="AI & ML"){
      nav("/senior/aichat")
    }
    else if(specialization==="Digital Marketing"){
      nav("/senior/digitalchat")
    }
    else{
      toast.error("Eror")
    }
  }
  return (
    <>
      {/*================ Start Header Menu Area =================*/}
  <header className="header_area">
    <div className="main_menu">
      {/* <div className="search_input" id="search_input_box">
        <div className="container">
          <form className="d-flex justify-content-between" method="" action="">
            <input
              type="text"
              className="form-control"
              id="search_input"
              placeholder="Search Here"
            />
            <button type="submit" className="btn" />
            <span className="ti-close" id="close_search" title="Close Search" />
          </form>
        </div>
      </div> */}
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{backgroundColor:"white"}}>
        <div className="container">
          {/* Brand and toggle get grouped for better mobile display */}
          <a className="navbar-brand logo_h" href="index.html">
            <img src="/assets/img/LogoSeniorBuddy.png" alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="icon-bar" /> <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          {/* Collect the nav links, forms, and other content for toggling */}
          <div
            className="collapse navbar-collapse offset"
            id="navbarSupportedContent"
          >
            <ul className="nav navbar-nav menu_nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/senior">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                {/* <Link className="nav-link" to="/">
                  Events
                </Link> */}
                 <div className="nav-item dropdown">
                <button
                  className="btn btn-light dropdown-toggle nav-link"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Events
                </button>
                <ul className="dropdown-menu dropdown-menu-dark" style={{width:"100px",backgroundColor:"rgb(7, 137, 177)"}}>
                  <li>
                    <Link className="dropdown-item" to="/senior/addevent">
                      Add
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/senior/manageevent" >
                      Manage
                    </Link>
                  </li>
                </ul>
              </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/senior/viewRequest">
                  View Attendies
                </Link>
              </li>
              <li className="nav-item ">
                <a className="nav-link" onClick={naviagteChat}>
                <img src="/assets/img/chatIcon.png" alt="start chat" style={{cursor:"pointer"}}/>
                </a>
              </li>
              <div className="nav-item dropdown">
               {!userId ? (
                <Link
                  to="/login"
                  className="nav-item nav-link"
                >
                 <img
                    src={"/assets/img/profile.png"}
                    width="30px"
                    height="30px"
                    style={{
                      fontSize: "25px",
                      marginRight: "5px",
                      borderRadius: "100px",
                      marginTop:"25px"
                    }}
                  />
                  Login
                </Link>
              ) : (
                <div>
                <Link
                  to="/senior/profile"
                  className="nav-item nav-link"
                >
                  <img
                    src={sessionStorage.getItem('image') ? sessionStorage.getItem('image') : "/assets/img/profile.png"}
                    width="30px"
                    height="30px"
                    style={{
                      fontSize: "25px",
                      marginRight: "5px",
                      borderRadius: "100px",
                      
                    }}
                    onError={(e) => { e.target.src = "/assets/img/profile.png"; }}
                  />
                  Account
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark" style={{width:"100px",backgroundColor:"rgb(7, 137, 177)"}}>
                  <li>
                    <Link
                     className="dropdown-item" to="/login" onClick={logout}>
                      Logout
                    </Link>
                  </li>
                </ul>
                </div>
              )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
  {/*================ End Header Menu Area =================*/}
    </>
  )
}
