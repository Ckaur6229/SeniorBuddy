import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
export default function ViewFutureEvents() {
    const [Events, setEvents] = useState([]);
    const [Loader, setLoader] = useState(false);
   const nav=useNavigate()
    const getAllEvents = () => {
      setLoader(true);
      const Query = query(collection(db, "Events"), orderBy("createdAt", "desc"));
      onSnapshot(Query, (doc) => {
          const today = new Date().toISOString().split("T")[0]; 
          const filteredEvents = doc.docs
            .filter(
              (elem) => elem.data().status === true && elem.data().date >= today
            )
            .map((elem) => ({ id: elem.id, data: elem.data() }));
          setEvents(filteredEvents)
      }, (error) => {
        console.error("Error fetching drives:", error);
        setLoader(false)
        }
    );
    setLoader(false)
    };
  
    useEffect(() => {
      getAllEvents();
    }, []);
    let userId=sessionStorage.getItem("userId")
    const joinFunc=(id)=>{
      if(!userId){
        toast.error("Please login")
        nav("/login")
      }
      else{
        nav(`/join/${id}`)
      }
      setTimeout(()=>{
        setLoader(false)
      },1000)
      
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
                <h2>Upcomming Events</h2>
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
          {
            Events.length<=0?(
              <h2 className="text-center my-4">No data available</h2>
            ):(
              <div className="row my-5 text-center">
              {Events?.map((current, index) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-9 col-11 mx-auto"
                  key={index}
                >
                  <div
                    className="card my-2"
                    style={{ boxShadow: "5px 5px 5px", borderRadius: "8px" }}
                  >
                    <img
                      src={current?.data?.image}
                      className="card-img-top"
                      style={{ borderRadius: "8px"}}
                      height="200px"
                    />
                    <div className="card-body">
                    <h5 className="card-title" style={{color:" #002347"}}>
                        {current?.data?.title}
                      </h5>
                      <p className="card-text">
                        Description : {current?.data?.description}
                      </p>
                      <p className="card-text">
                        Mode : {current?.data?.mode}
                      </p>
                      <p className="card-text">
                        Venue : {current?.data?.venue}
                      </p>
                     <div className="d-flex justify-content-around">
                     <p className="card-text">
                        Time : {current?.data?.time}
                      </p>
                      <p className="card-text ">Date : {current?.data?.date}</p>
                     </div>
                    </div>
                    <div>
                      <a
                        // onClick={()=>{participate(current?.id, current?.data?.title, current?.data?.date, current?.data?.descrption,current?.data?.mode, current?.data?.image, current?.data?.venue)}}
                        className="btn btn-sm mx-5 mb-2 text-white rounded"
                        style={{backgroundColor:"#002347"}}
                        // to={`/join/${current.id}`}
                        onClick={() => joinFunc(current.id)}
                      >
                        Register 
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )
          }
        </div>
    </>
  )
}}
