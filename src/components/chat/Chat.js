import React, { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from "../../Firebase";
import { toast } from 'react-toastify';

export default function Chat() {
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const uid=sessionStorage.getItem("userId")
  const handleMessage = async (e) => {
    e.preventDefault();

    let name = sessionStorage.getItem("name");
    let image = sessionStorage.getItem("image");
    try {
      let data = { message: message, name: name, image: image, user_Id:uid, createdAt: new Date() };
      await addDoc(collection(db, "webDevChat"), data);
      setMessage("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllMessages = () => {
    const Query = query(collection(db, "webDevChat"), orderBy("createdAt","asc"));
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

  return (
    <>
      <div className="chat position-relative">
        {
          allMessage.length > 0 ? (
            allMessage.map(({ id, data }) => (
               uid===data.user_Id?(
                <div className="messages" key={id}>
                <div className="messageInfo">
                  <img
                    src={!data.image ?"/assets/img/profile.png": data.image } 
                    // alt={data?.name || "user"} 
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
                    // alt={data?.name || "user"} 
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
          <div className="input p-2 d-flex align-items-center justify-content-between position-fixed bottom-0 w-100" style={{backgroundColor:"white"}}>
            <input 
              type="text" 
              className="w-100" 
              placeholder="Message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
            />
            <div className="send position-fixed bottom-0 end-0 my-1">
              <button className="btn btn-warning btn-small">Send</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
