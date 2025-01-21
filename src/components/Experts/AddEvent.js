import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db, storage } from '../../Firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { BeatLoader } from 'react-spinners';
export default function AddEvent() {
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [mode, setMode] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("")
    const [venue, setVenue] = useState("");
    const [file, setFile] = useState({});
    const [fileName, setFileName] = useState("");
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [Loader, setLoader] = useState(true)
    const changeImage=(e)=>{
        setFileName(e.target.value)
        setFile(e.target.files[0])
    }
    useEffect(() => {
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }, []); 
    const handleAddEvent=(e)=>{
        e.preventDefault();
        setLoader(true);
        if (!fileName) {
            toast.error("Please upload image");
            setLoader(false); 
            return;
          }
        
          const storageRef = ref(storage, "EventImages/" + fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
        
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              setProgress(progress);
            },
            (error) => {
              console.log(error);
              setLoader(false);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File available at", downloadURL);
                setUrl(downloadURL);
              });
            }
          );
        };
        
        useEffect(() => {
          if (!!url) {
            saveData();
          }
        }, [url]);
        
        const saveData = async () => {
          try {
            let data = {
              date: date,
              title: title,
              mode: mode,
              description: description,
              time:time,
              venue: venue,
              status: true,
              createdAt: Timestamp.now(),
              image: url,
            };
        
            await addDoc(collection(db, "Events"), data);
            toast.success("Event added successfully");
            setDate("");
            setMode("");
            setDescription("");
            setVenue("");
            setTitle("");
            setTime("")
            setFile({});
            setFileName("");
            setUrl("");
            setLoader(false);
          } catch (err) {
            toast.error(err.message);
            setLoader(false);
          }
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
                  <h2>Add Event</h2>
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
        <h3 className="mb-3">Add Event</h3>
        <form className="form_area" id="myForm" onSubmit={handleAddEvent}>
          <div className="row">
            <div className="col-lg-12 form_group">
              <label htmlFor="date" className="label-left">Date</label>
              <input
                type="date"
                id="date"
                required
                className="my-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />

              <label htmlFor="title" className="label-left">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                required
                className="my-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label htmlFor="mode" className="label-left">Event Mode</label>
              <input
                type="text"
                id="mode"
                placeholder="Event Mode"
                required
                className="my-2"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              />

              <label htmlFor="time" className="label-left">Event Timing</label>
              <input
                type="text"
                id="time"
                required
                className="my-2"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />

              <label htmlFor="image" className="label-left">Image</label>
              <input
                type="file"
                id="image"
                required
                className="my-2"
                onChange={changeImage}
              />

              <label htmlFor="description" className="label-left">Description</label>
              <input
                type="text"
                id="description"
                placeholder="Description"
                required
                className="my-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label htmlFor="venue" className="label-left">Venue</label>
              <input
                type="text"
                id="venue"
                placeholder="Venue"
                required
                className="my-2"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
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
}