import React from 'react'
import { Link } from 'react-router-dom'

export default function StartChatting() {
  return (
    <>
 {/*================ Start Feature Area =================*/}
  <section className="feature_area section_gap_top">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="main_title">
            <h2 className="mb-3">Find Chat Groups</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
         <Link to='/webdevchat' rel="noopener noreferrer">
         <div className="single_feature">
            <div className="icon">
              <span className="flaticon-student" />
            </div>
            <div className="desc">
              <h4 className="mt-3 mb-2">Web Development</h4>
            </div>
          </div>
         </Link>
        </div>
        <div className="col-lg-4 col-md-6">
        <Link to="/datascichat">
        <div className="single_feature">
            <div className="icon">
              <span className="flaticon-student" />
            </div>
            <div className="desc">
              <h4 className="mt-3 mb-2">Data Science</h4>
            </div>
          </div>
        </Link>
        </div>
        <div className="col-lg-4 col-md-6">
         <Link to='/aichat'>
         <div className="single_feature">
            <div className="icon">
              <span className="flaticon-student" />
            </div>
            <div className="desc">
              <h4 className="mt-3 mb-2">AI/ML</h4>
            </div>
          </div>
         </Link>
        </div>
        <div className="col-lg-4 col-md-6">
         <Link to='/cyberchat'>
         <div className="single_feature">
            <div className="icon">
              <span className="flaticon-student" />
            </div>
            <div className="desc">
              <h4 className="mt-3 mb-2">Cybersecurity</h4>
            </div>
          </div>
         </Link>
        </div>
        <div className="col-lg-4 col-md-6">
         <Link to='/appdevchat'>
         <div className="single_feature">
            <div className="icon">
              <span className="flaticon-student" />
            </div>
            <div className="desc">
              <h4 className="mt-3 mb-2">App Development</h4>
            </div>
          </div>
         </Link>
        </div>
        <div className="col-lg-4 col-md-6">
         <Link to='/digitalchat'>
         <div className="single_feature">
            <div className="icon">
              <span className="flaticon-student" />
            </div>
            <div className="desc">
              <h4 className="mt-3 mb-2">Digital Marketing</h4>
            </div>
          </div>
         </Link>
        </div>
      </div>
    </div>
  </section>
  {/*================ End Feature Area =================*/}
  {/*================ Start Popular Courses Area =================*/}
    </>
  )
}
