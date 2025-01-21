import React from 'react'
import AdminHeader from './AdminHeader'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminFooter from './AdminFooter'

export default function AdminMaster() {
  const email=sessionStorage.getItem("email")
  if(!email){
    toast.error("Please login")
    return <Navigate to={"/login"}/>
}
  return (
    <>
      <AdminHeader/>
      <Outlet/>
      <AdminFooter/>
    </>
  )
}
