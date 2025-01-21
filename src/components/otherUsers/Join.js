import { addDoc, collection, doc, getDoc, Timestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../Firebase'
import { toast } from 'react-toastify'

export default function Join() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [program, setProgram] = useState("")
    const [smester, setSmester] = useState()
    const [contact, setContact] = useState("")
    const {id}=useParams();
    console.log(id)
    const nav=useNavigate()
    useEffect(() => {
       setFields()
    }, [])
    
    const setFields=()=>{
        setName(sessionStorage.getItem('name'))
        setEmail(sessionStorage.getItem('email'))
        setContact(sessionStorage.getItem('contact'))
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
      const docRef= doc(db,"Events",id)
      let docData=await getDoc(docRef)
      console.log(docData.data())
      if(docData.exists()){
        const EventData=docData.data();
        try{
          let data={
            userId:sessionStorage.getItem("userId"),
            name:name,
            email:email,
            program:program,
            smester:smester,
            contact:contact,
            status:true,
            eventDate:EventData.date,
            eventTitle:EventData.title,
            image:EventData.image,
            eventDate:EventData.date,
            venue:EventData.venue,
            eventId:id,
            createdAt:Timestamp.now()
          }
          await addDoc(collection(db, "Attendies"), data);
          toast.success("Request is sent!")
        }
        catch(err){
           toast.error(err.message)
          
      }}

      setName("");
      setEmail("");
      setProgram("");
      setSmester("");
      setContact("");
      nav("/upcommingEvents")
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
                  <h2>Register for Event</h2>
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
      <div className="register_form my-4" style={{ backgroundColor: "#f9f9ff" }}>
        <h3 className="mb-3">Register</h3>
        <form className="form_area" id="myForm" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-12 form_group">
              <label htmlFor="date" className="label-left">Name</label>
              <input
                type="text"
                id="text"
                required
                className="my-2"
                value={name}
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
              />

              <label className="label-left">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                className="my-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="label-left">Program</label>
              <input
                type="text"
                id="program"
                placeholder="Program"
                required
                className="my-2"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
              />

              <label className="label-left">Smester</label>
              <input
                type="number"
                id="sem"
                required
                className="my-2"
                placeholder='Smester'
                value={smester}
                onChange={(e) => setSmester(e.target.value)}
              />

              <label className="label-left">Contact</label>
              <input
                type="number"
                id="contact"
                placeholder="Contact"
                required
                className="my-2"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="col-lg-12 text-center">
              <button className="primary-btn">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
