import React from 'react'

export default function SeniorHome() {
    const name=sessionStorage.getItem("name")
  return (
    <>
      {/*================ Start Home Banner Area =================*/}
  <section className="home_banner_area">
    <div className="banner_inner">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="banner_content text-center">
              <p className="" style={{marginTop:"-100px",fontSize:"40px"}}>
              Welcome {name}
              </p>
              <h2 className="text-uppercase mt-4 mb-3">
              Your guidance inspires growth and innovation
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*================ End Home Banner Area =================*/}
 
  
    </>
  )
}
