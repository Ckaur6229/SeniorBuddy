import React, { useEffect, useState } from 'react'
import NavbarChat from './NavbarChat'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../Firebase';

export default function Sidebar() {
  const [allUsers, setAllUsers] = useState([]);
  const uid=sessionStorage.getItem("userId")
  const getAllMessages = () => {
    const Query = query(collection(db, "User"), orderBy("createdAt","asc"));
    onSnapshot(Query, (doc) => {
      // const today = new Date().toISOString().split("T")[0]; 
      const filteredMessages = doc.docs
        .filter(
          (elem) => elem.data().specialization === "Web Development"
        )
        .map((elem) => ({ id: elem.id, data: elem.data() }));
      setAllUsers(filteredMessages)
  }, (error) => {
    console.error("Error fetching drives:", error);
    }
);
  };

  useEffect(() => {
    getAllMessages();
  }, []); 

  return (
    <>
      <div className="sidebar">
        <NavbarChat/>
        <p className='text-white'>All Seniors - Web Development</p>
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
    </>
  )
}
