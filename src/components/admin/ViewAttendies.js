import { collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase';
import { toast } from 'react-toastify';
import moment from 'moment';
import { BeatLoader } from 'react-spinners';
export default function ViewAttendies() {
    const [allRequests, setAllRequests] = useState([]);
    const [Loader, setLoader] = useState(false);
    useEffect(() => {
        setLoader(true);
      getAllRequests();
    }, []);
  
    const getAllRequests = async () => {
      const Query = query(collection(db, "Attendies"), orderBy("createdAt","desc"));
      onSnapshot(Query, (doc) => {
        setAllRequests(
            doc.docs.map((elem) => ({ id: elem.id, data: elem.data() })) 
          );
          setTimeout(()=>{
            setLoader(false); 
          },1000)
      });
    };
    const getDate = (date) => {
      let date1 = date?.toDate();
      return moment(date1).format("MMMM Do, YYYY");
    };
    const updateStatus=async (id,status)=>{
      if(status===2){
        if (window.confirm("Do you want to accept user's request?")) {
          try { 
            const docRef = doc(db, "Attendies", id);
            let data = {
              status: status,
            };
            await updateDoc(docRef, data);
            toast.success("Data updated");
          } catch (err) {
            console.log(err);
            toast.error("Internal server error");
          }
        }
      }
      else{
        if (window.confirm("Do you want to decline user's request?")) {
          try { 
            const docRef = doc(db, "Attendies", id);
            let data = {
              status: status,
            };
            await updateDoc(docRef, data);
            toast.success("Data updated");
          } catch (err) {
            console.log(err);
            toast.error("Internal server error");
          }
        }
      }
    }
    if (Loader) {
        return (
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
              zIndex: 9999,
            }}
          >
            <BeatLoader color="#f8b600" loading={Loader} size={20} />
          </div>
        );
      } else {
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
                <h2>View attendies for joining Event</h2>
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
    <div className="container-fluid my-5 table-responsive">
      {allRequests.length===0?
      (<div className='text-center'>
        <h1>No Data Available</h1>
      </div>):
         (
        <table className="table  table-bordered table-hover ">
          <thead style={{ textAlign: "center" }}>
            <tr>
            <th scope="col">S no.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Program</th>
              <th scope="col">Smester</th>
              <th scope="col">Contact</th>
              <th scope="col">Status</th>
              <th scope="col">CreatedAt</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {allRequests?.map((current, index) => (
              <tr key={index}>
                <td scope="row">{index + 1}</td>
                <td>{current?.data?.name}</td>
                <td>{current?.data?.email}</td>
                <td>{current?.data?.program}</td>
                <td>{current?.data?.smester}</td>
                <td>{current?.data?.contact}</td>
                <td>{current?.data?.status == 2 ? "true" : "false"}</td>
                <td>{getDate(current?.data?.createdAt)}</td>
                <td>
                  {current?.data?.status == 2 ? (
                    <i
                      className="fa fa-check"
                      style={{color:"green"}}
                    >
                    </i>
                  ) : current?.data?.status == 3 ?(
                    <i
                      className="fa fa-times"
                      style={{color:"red"}}
                    >
                    </i>
                  ):
                  <div className='d-flex '>
                  <button className="btn btn-warning btn-sm me-2 text-white rounded" 
                  style={{marginLeft:"20px"}}
                   onClick={() => {
                    updateStatus(current.id, 2,current?.data?.driveId);
                  }}
                >Approve</button>
                <button className="btn btn-outline-warning btn-sm" style={{marginLeft:"5px"}} onClick={() => {
                    updateStatus(current.id, 3,current?.data?.driveId);
                  }}>Decline</button>
                  </div>
                }
              </td>
              </tr>
            ))}
          </tbody>
        </table>
         )}
      </div>
    </>
  )
}
}