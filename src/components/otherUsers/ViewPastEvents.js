import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ViewPastEvents() {
    const [Events, setEvents] = useState([]);
  
    const getAllEvents = () => {

      const Query = query(collection(db, "Events"), orderBy("createdAt", "desc"));
      onSnapshot(Query, (doc) => {
          const today = new Date().toISOString().split("T")[0]; 
          const filteredEvents = doc.docs
            .filter(
              (elem) => elem.data().status === true && elem.data().date < today
            )
            .map((elem) => ({ id: elem.id, data: elem.data() }));
          setEvents(filteredEvents)
      }, (error) => {
        console.error("Error fetching drives:", error);
        }
    );
        
    };
  
    useEffect(() => {
      getAllEvents();
    }, []);
    const nav=useNavigate()
    const participate=async(id, title, date, image, venue, mode, descrption)=>{
      let userId=sessionStorage.getItem("userId")
      let email=sessionStorage.getItem("email")
      let name=sessionStorage.getItem("name")
      // const docRef = doc(db, "Drives", id);
      //     let data = {
      //       availableSlots: Slots >= 0 ? Slots-1 : 0,
      //     };
      //     await updateDoc(docRef, data);
      if(!userId){
        toast.error("Please login")
        nav("/login")
      }else{
        try{
          let data={
            eventId:id,
            eventTitle:title,
            eventDate:date,
            mode:mode,
            descrption:descrption,
            venue:venue,
            image:image,
            userId:userId,
            userEmail:email,
            userName:name,
            status:1,
            //1-> pending, 2-> approved, 3-> decline
            createdAt:Timestamp.now()
          }
          await addDoc(collection(db, "Requests"), data);
          toast.success("Request is sent!")
        }catch(err){
           toast.error(err.message)

          
      }
       
      }
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
                <h2>Past Events</h2>
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
                        onClick={()=>{participate(current?.id, current?.data?.title, current?.data?.date, current?.data?.descrption,current?.data?.mode, current?.data?.image, current?.data?.venue)}}
                        className="btn btn-sm mx-5 mb-2 text-white rounded"
                        style={{backgroundColor:"#002347"}}
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
}
