import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
  } from "firebase/firestore";
  import React, { useEffect, useState } from "react";
  import { db } from "../../Firebase";
  import moment from "moment";

export default function History() {
    const [request, setRequest] = useState([]);
    useEffect(() => {
      getAllRequests();
    }, []);
  
    const getAllRequests = async () => {
      const userId = sessionStorage.getItem("userId");
      const Query = query(
        collection(db, "RequestForJoin"),
        orderBy("createdAt", "desc"),
        where("userId", "==", userId)
      );
      onSnapshot(Query, (doc) => {
        setRequest(
          doc.docs.map((elem, index) => {
            return { id: elem.id, data: elem.data() };
          })
        );
      });
    };
    const getDate = (date) => {
      let date1 = date?.toDate();
      return moment(date1).format("YYYY-MM-DD");
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
                <h2>Your History</h2>
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
      <div className="container my-5">
        {request.length === 0 ? (
          <div className="text-center">
            <h1>No Data Available</h1>
          </div>
        ) : (
          <div className="row my-5 ">
            {request?.map((current, index) => (
              //     <tr key={index}>
              //   <td>Your Request for "{current?.data?.driveTitle}" is {current?.data?.status == 2 ? <span className='text-success'>Appoved</span> : current.data.status==3?<span className='text-danger'>Decline</span> :"Pending"}</td>
              // </tr>
              <div
                className="col-lg-6 col-md-6 col-sm-9 col-11 mx-auto"
                key={index}
              >
                <div
                  className="card my-2"
                  style={{ boxShadow: "5px 5px 5px", borderRadius: "8px" }}
                >
                  <div className="card-body">
                    <div class="row text-center">
                    <div class="col-lg-3 text-center">
                    <img src={current?.data?.image} width="130px" height="130px" />
                      </div>
                      <div class="col-sm-7 col-lg-9 col-md-12">
                        <div className="row pt-2">
                        <h3 className="card-title text-center px-3" style={{color:"#fdc632"}}>
                      {current?.data?.eventTitle} ( {current?.data?.venue} )
                    </h3>
                        </div>
                        <div class="row">
                          <div class="col">Event Date - {current?.data?.eventDate}</div>
                        </div>
                        <div class="row">
                          <div class="col">Applied Date - {getDate(current?.data?.createdAt)}</div>
                        </div>
                        <div class="row pt-2">
                          <h4 class="col"> 
                      {current?.data?.status == 2 ? (
                        <span className="text-success">Request Appoved</span>
                      ) : current.data.status == 3 ? (
                        <span className="text-danger">Request Declined</span>
                      ) : (
                        "Pending Request"
                      )}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
