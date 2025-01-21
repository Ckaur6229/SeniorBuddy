import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { app, db } from "../../Firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [contact, setContact] = useState("");
  const { type } = useParams();
  const userType = parseInt(type, 10);
  const nav = useNavigate();
  const addData = async (userId) => {
    try {
      let data = {
        Name: Name,
        email: email,
        contact: contact,
        userType: userType,
        user_Id: userId,
        status: true,
        createdAt: Timestamp.now(),
      };
      await setDoc(doc(db, "User", userId), data);
      if (userType === 3) {
        toast.success("You Registered Successfully");
        nav("/");
      } else {
        toast.success("You Registered Successfully");
        nav("/senior");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const addGoogleData = async (userId, name, email) => {
    try {
      let data = {
        Name: name,
        email: email,
        userType: type,
        user_Id: userId,
        status: true,
        createdAt: Timestamp.now(),
      };
      await setDoc(doc(db, "User", userId), data);
      if (type === 3) {
        toast.success("You Registered Successfully");
        nav("/");
      } else {
        toast.success("You Registered Successfully");
        nav("/senior");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const getData = async (userId) => {
    const docRef = doc(db, "User", userId);
    let docData = await getDoc(docRef);
    if (docData.exists()) {
      const userData = docData.data();
      sessionStorage.setItem("name", userData.Name);
      sessionStorage.setItem("email", userData.email);
      //  sessionStorage.setItem("address",userData.address)
      sessionStorage.setItem("contact", userData.contact);
      sessionStorage.setItem("userId", userData.user_Id);
      sessionStorage.setItem("userType", userData.userType);
    } else {
      alert("No data found");
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        let userId = userCredentials.user.uid;
        addData(userId);
        getData(userId);
      })
      .catch((err) => {
        toast.error(err.message);
      });
    setName("");
    setEmail("");
    setPassword("");
    setContact("");
  };
  const registerGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, googleProvider)
      .then((userCredentials) => {
        let userId = userCredentials.user.uid;
        let name = userCredentials.user.displayName;
        let email = userCredentials.user.email;
        addGoogleData(userId, name, email);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
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
                  <h2>Sign up</h2>
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
            <div
              className="register_form my-4"
              style={{ backgroundColor: "rgb(234,234,255)" }}
            >
              <h3 className="mb-3">Sign up</h3>
              <form onSubmit={submitForm}>
                <div className="col-lg-12 form_group">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className="my-2"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="my-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Set Password"
                    required
                    className="my-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Contact"
                    required
                    className="my-2"
                    value={contact}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value) && value.length <= 10) {
                        setContact(value);
                      }
                    }}
                    onBlur={() => {
                      if (contact.length !== 10) {
                        toast.error("Contact number must be exactly 10 digits")
                      }
                    }}
                  />
                </div>
                <div className="col-lg-12 text-center">
                  <button className="primary-btn">Submit</button>
                </div>
                <p className="text-center">or</p>
                <div className="col-12">
                  <button
                    className="btn-hover-bg btn w-100 py-1 px-5 border border-dark"
                    type="button"
                    onClick={registerGoogle}
                  >
                    <img
                      src="/assets/img/googleIcon.png"
                      className="pe-3"
                      width="50px"
                    />
                    Register with Google
                  </button>
                </div>
              </form>
              <p className="pt-3">
                Already have an account?
                <span>
                  <Link to="/login" style={{ color: "#002347" }}>
                    Login
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
