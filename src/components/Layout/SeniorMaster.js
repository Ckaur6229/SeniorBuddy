import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import SeniorHeader from './SeniorHeader'
import { toast } from 'react-toastify'
import SeniorFooter from './SeniorFooter';

export default function SeniorMaster() {
  const location = useLocation();
  const Paths = ['/senior/webdevchat', '/senior/appdevchat', '/senior/cyberchat', '/senior/digitalchat', '/senior/aichat', '/senior/datascichat'];
  const email=sessionStorage.getItem("email")
  if(!email){
    toast.error("Please login")
    return <Navigate to={"/login"}/>
}
  return (
    <>
      {!Paths.includes(location.pathname) && <SeniorHeader/>}
      <Outlet />
      {!Paths.includes(location.pathname) && <SeniorFooter/>}
    </>
  )
}
