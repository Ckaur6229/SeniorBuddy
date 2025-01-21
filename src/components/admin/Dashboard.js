import { collection, getCountFromServer, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../Firebase";

export default function Dashboard() {
  const [seniors, setSeniors] = useState(0)
    const [juniors, setJuniors] = useState(0)
    const [Events, setEvents] = useState(0)
    const [requests, setRequests] = useState(0)
    useEffect(() => {
       getSeniorCount();
       getJuniorCount();
       getEventCount();
       getRequestCount(); 
    }, [])

    const getSeniorCount=async ()=>{
        let ref=collection(db,"User")
        let que = query(ref, where("userType", "==", 2));
        let user=await getCountFromServer(que)
        setSeniors(user.data().count)
    }
    const getJuniorCount=async ()=>{
      let ref=collection(db,"User")
      let que = query(ref, where("userType", "==", 3));
      let user=await getCountFromServer(que)
      setJuniors(user.data().count)
    }
    const getEventCount=async ()=>{
        let ref=collection(db,"Events")
        let post=await getCountFromServer(ref)
        setEvents(post.data().count)
    }
    const getRequestCount=async ()=>{
        let ref=collection(db,"Attendies")
        let req=await getCountFromServer(ref)
        setRequests(req.data().count)
    }
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
                <h2>Dashboard</h2>
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
  <div className="row my-5 justify-content-center text-center">
    <div className="col-lg-6 col-md-6 col-sm-9 col-11">
      <div
        className="card my-2 mx-auto"
        style={{
          boxShadow: "5px 5px 5px",
          borderRadius: "8px",
          width: "15rem",
        }}
      >
        <div className="card-body">
          <h5 className="card-title text-primary">Total Seniors</h5>
          <h1 className="card-text">{seniors}</h1>
        </div>
      </div>
    </div>

    <div className="col-lg-6 col-md-6 col-sm-9 col-11">
      <div
        className="card my-2 mx-auto"
        style={{
          boxShadow: "5px 5px 5px",
          borderRadius: "8px",
          width: "15rem",
        }}
      >
        <div className="card-body">
          <h5 className="card-title text-primary">Total Juniors</h5>
          <h1 className="card-text">{juniors}</h1>
        </div>
      </div>
    </div>

    <div className="col-lg-6 col-md-6 col-sm-9 col-11">
      <div
        className="card my-2 mx-auto"
        style={{
          boxShadow: "5px 5px 5px",
          borderRadius: "8px",
          width: "15rem",
        }}
      >
        <div className="card-body">
          <h5 className="card-title text-primary">Total Events</h5>
          <h1 className="card-text">{Events}</h1>
        </div>
      </div>
    </div>

    <div className="col-lg-6 col-md-6 col-sm-9 col-11">
      <div
        className="card my-2 mx-auto"
        style={{
          boxShadow: "5px 5px 5px",
          borderRadius: "8px",
          width: "15rem",
        }}
      >
        <div className="card-body">
          <h5 className="card-title text-primary">Total Attendies</h5>
          <h1 className="card-text">{requests}</h1>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}
