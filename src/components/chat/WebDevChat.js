import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

export default function WebDevChat() {
  return (
    <>
      <div className="back">
        <div className="webcontainer">
        <Sidebar/>
        <Chat/>
        </div>
      </div>
    </>
  );
}
