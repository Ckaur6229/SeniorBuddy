import React from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat'

export default function Chatcontainer() {
  let name=sessionStorage.getItem("name")
  let image=sessionStorage.getItem("image")
  return (
    <>
        <div className="back">
        <div className="container">
          <Sidebar/>
          <Chat name={name} image={image}/>
        </div>
      </div>
    </>
  )
}
