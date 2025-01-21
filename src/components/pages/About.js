import React from 'react'

export default function About() {
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
                <h2>About Us</h2>
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
    {/*================ Start About Area =================*/}
    <section className="about_area section_gap">
      <div className="container">
        <div className="row ">
          <div className="col-lg-6">
            <div className="h_blog_img">
              <img className="img-fluid" src="/assets/img/about.png" alt="" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="h_blog_text">
              <div className=" left right">
                <h4>Welcome to our Institute</h4>
                <p>
                Our platform empowers juniors to connect with knowledgeable seniors, 
                gaining guidance, insights, and support on their journey toward success. 
                Through project discussions, skill-sharing, and event participation, 
                we aim to create a thriving community where learning is a two-way street,
                 and growth is limitless
                </p>
                <p>
                We are dedicated to fostering a vibrant community where ideas flow freely, 
                and learning is continuous. Whether it's through interactive discussions, 
                workshops, or hands-on project collaborations, Our Platform serves as a hub for 
                innovation and growth. Together, we are shaping a future where juniors and seniors 
                work side by side, unlocking new opportunities and driving collective success.
                </p>
                {/* <a className="primary-btn" href="#">
                  Learn More <i className="ti-arrow-right ml-1" />
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*================ End About Area =================*/}
     {/*================ Start Feature Area =================*/}
  <section className="feature_area section_gap_top">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="main_title">
            <h2 className="mb-3">Awesome Feature</h2>
            {/* <p>Replenish man have thing gathering lights yielding shall you</p> */}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="single_feature">
            <div className="icon">
              <span className="flaticon-student" />
            </div>
            <div className="desc">
              <h4 className="mt-3 mb-2">Real-Time Chat</h4>
              <p>
              Juniors and seniors can engage in real-time conversations, 
              discuss about problems
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single_feature">
            <div className="icon">
              <span className="flaticon-book" />
            </div>
            <div className="desc">
              <h4 className="mt-3 mb-2">Event Registration</h4>
              <p>
              Juniors can explore and register for workshops, webinars, and events organized by seniors
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single_feature">
            <div className="icon">
              <span className="flaticon-earth" />
            </div>
            <div className="desc">
              <h4 className="mt-3 mb-2">Knowledge Sharing</h4>
              <p>
              A dedicated space where seniors can share articles, tutorials,
               and resources related to various topics
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*================ End Feature Area =================*/}
   
    </>
  )
}

