import React, { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from "../../Firebase";
import { toast } from 'react-toastify';
import NavbarChat from './NavbarChat';
export default function DigitalChat() {
    const [message, setMessage] = useState("");
    const [allMessage, setAllMessage] = useState([]);
    const uid=sessionStorage.getItem("userId")
    const handleMessage = async (e) => {
      e.preventDefault();
  
      let name = sessionStorage.getItem("name");
      let image = sessionStorage.getItem("image");
      try {
        let data = { message: message, name: name, image: image, user_Id:uid, createdAt: new Date() };
        await addDoc(collection(db, "DigitalMessages"), data);
        setMessage("");
      } catch (error) {
        toast.error(error.message);
      }
    };
  
    const getAllMessages = () => {
      const Query = query(collection(db, "DigitalMessages"), orderBy("createdAt","asc"));
      onSnapshot(Query, (doc) => {
        const filteredMessages = doc.docs.map((elem) => ({
          id: elem.id,
          data: elem.data()
        }));
        setAllMessage(filteredMessages);
      }, (error) => {
        console.error("Error fetching messages:", error);
      });
    };
    useEffect(() => {
        getAllMessages();
      }, []); 
    
      const [allUsers, setAllUsers] = useState([]);
      const getAllUsers = () => {
        const Query = query(collection(db, "User"), orderBy("createdAt","asc"));
        onSnapshot(Query, (doc) => {
          // const today = new Date().toISOString().split("T")[0]; 
          const filteredMessages = doc.docs
            .filter(
              (elem) => elem.data().specialization === "Digital Marketing"
            )
            .map((elem) => ({ id: elem.id, data: elem.data() }));
          setAllUsers(filteredMessages)
      }, (error) => {
        console.error("Error fetching messages:", error);
        }
    );
      };
    
      useEffect(() => {
        getAllUsers();
      }, []); 
    
  return (
    <>
       <div className="back">
        <div className="webcontainer">
        {/* Sidebar Starts */}
        <div className="sidebar">
        <NavbarChat/>
        <p className='text-white pt-2 ps-3'>All Seniors - Digital Marketing</p>
       {
     allUsers.map((item) => (
      <div className="sidebarContainer d-flex" key={item.id}>
        <div className="sidebarInfo">
          <img src={item.data.image ? item.data.image : "/assets/img/profile.png"} alt="" />
        </div>
        <div className="sidebarContent">
          <p>{item.data.Name}</p>
        </div>
      </div>
    ))
    
       }
      </div>
        {/* Sidebar ends */}
        <div className="chat position-relative">
        {
          allMessage.length > 0 ? (
            allMessage.map(({ id, data }) => (
               uid===data.user_Id?(
                <div className="messages" key={id}>
                <div className="messageInfo">
                  <img
                    src={data.image ? data.image : "/assets/img/profile.png"} 
                    alt={data?.name || "user"} 
                  />
                </div>
                <div className="messageContent">
                  <p>{data?.message}</p>
                </div>
              </div>
               ):(
                <div className="another" key={id}>
                <div className="messageInfo">
                  <img
                    src={data.image ? data.image : "/assets/img/profile.png"} 
                    alt={data?.name || "user"} 
                  />
                </div>
                <div className="messageContent">
                  <p>{data?.message}</p>
                </div>
              </div>
               )
            ))
          ) : (
            <p>No messages yet</p>
          )
        }

        <form onSubmit={handleMessage}>
          <div className="input p-2 d-flex align-items-center justify-content-between position-absolute bottom-0 w-100" style={{backgroundColor:"white"}}>
            <input 
              type="text" 
              className="w-100" 
              placeholder="Message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
            />
            <div className="send">
              <button className="btn btn-warning btn-small">Send</button>
            </div>
          </div>
        </form>
      </div>
        </div>
      </div>
    </>
  )
}
