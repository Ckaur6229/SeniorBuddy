import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { BeatLoader } from 'react-spinners';
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loader, setLoader] = useState(false)
  const nav=useNavigate();
  const handleLogin=(e)=>{
    e.preventDefault()
    setLoader(true)
    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredentails)=>{
     let user_id=userCredentails.user.uid
    const docRef= doc(db,"User",user_id)
    let docData=await getDoc(docRef)
    if(docData.exists() && docData.data().status===true){
     const userData=docData.data()
     console.log("User Type:", userData.userType);
     console.log(userData)
     sessionStorage.setItem("userId",userData.user_Id)
     sessionStorage.setItem("userType",userData.userType)
     sessionStorage.setItem("email",userData.email)
     if(userData.userType===1){
      toast.success("admin logged in successfully");
       nav("/admin")
     }else if(userData.userType===2){
      sessionStorage.setItem("name",userData.Name)
     sessionStorage.setItem("contact",userData.contact)
     sessionStorage.setItem("createdAt",userData.createdAt)
     sessionStorage.setItem("image",userData.image)
     sessionStorage.setItem("Specialization", userData.specialization);
      sessionStorage.setItem("userId", userData.user_Id);
      toast.success("You logged in successfully");
       nav("/senior")
     }
     else{
      sessionStorage.setItem("name",userData.Name)
     sessionStorage.setItem("contact",userData.contact)
     sessionStorage.setItem("createdAt",userData.createdAt)
     sessionStorage.setItem("image",userData.image)
      toast.success("You logged in successfully");
       nav("/")
     }
    }else{
     toast.error("User not found")
    }
    }).catch((err)=>{
     console.log(err);
     toast.error(err.message)
    }) .finally(() => {
      setLoader(false); 
    });
    setEmail("");
    setPassword("");
  }
  if(Loader===true){
    return(
      <>
          <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >
          <BeatLoader color="#f8b600" loading={Loader} size={20} />
        </div>
      </>
    )
  }
  else{
  return (
    <>
      {/*================Home Banner Area =================*/}
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="overlay" />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="banner_content text-center">
                  <h2>Login</h2>
                  <div className="page_link">
                    {/* <a href="index.html">Home</a>
                  <a href="about-us.html">About Us</a> */}
                    <p>Learn, Share, and Grow Together</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*================End Home Banner Area =================*/}
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 mx-auto">
            <div className="register_form my-4" style={{backgroundColor:"rgba(234,234,255)"}}>
              <h3 className="mb-3">Login</h3>
              <form
                className="form_area"
                id="myForm"
                onSubmit={handleLogin}
              >
                <div className="row">
                  <div className="col-lg-12 form_group">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      className="my-2"
                      value={email}
                      onChange={(event)=>{setEmail(event.target.value)}}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      className="my-2"
                      value={password}
                      onChange={(event)=>{setPassword(event.target.value)}}
                    />
                  </div>
                  <div className="col-lg-12 text-center">
                    <button className="primary-btn">Submit</button>
                  </div>
                </div>
              </form>
              <p className='pt-3'>Don't have an account?<span><Link to="/" style={{color:"#002347"}}>Sign up</Link></span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
}