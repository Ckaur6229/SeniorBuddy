import React from "react";

export default function Home() {
  const name = sessionStorage.getItem("name");
  return (
    <>
      {/*================ Start Home Banner Area =================*/}
      <section className="home_banner_area">
        <div className="banner_inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="banner_content text-center">
                  <p className="text-uppercase" style={{ marginTop: "-100px" }}>
                    Bridging Knowledge Across Generations
                  </p>
                  <h2 className="text-uppercase mt-4 mb-3">
                    Ignite Your Potential with Senior Guidance
                  </h2>
                  {name ? (
                    <h4 className="mb-3">Welcome {name}!</h4>
                  ) : (
                    <>
                      <h4 className="mb-3">Sign up as</h4>
                      <div>
                        <a
                          href="/registration/3"
                          className="primary-btn2 mb-3 mb-sm-0"
                        >
                          Junior
                        </a>
                        <a
                          href="/seniorRegistration/2"
                          className="primary-btn ml-sm-3 ml-0"
                        >
                          Senior
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*================ End Home Banner Area =================*/}
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
                    Juniors can explore and register for workshops, webinars,
                    and events organized by seniors
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
                    A dedicated space where seniors can share articles,
                    tutorials, and resources related to various topics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*================ End Feature Area =================*/}
      {/*================ Start Popular Courses Area =================*/}
      {/* <div className="popular_courses">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="main_title">
            <h2 className="mb-3">Find Your Field</h2>
            <p>Explore your field of interest to connect and collaborate with mentors </p>
          </div>
        </div>
      </div>
     
    </div>
  </div> */}
      {/*================ End Popular Courses Area =================*/}

      {/*================ Start Trainers Area =================*/}
      <section className="trainer_area section_gap_top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="main_title">
                <h2 className="mb-3">Our Seniors</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center d-flex align-items-center">
            <div className="col-lg-3 col-md-6 col-sm-12 single-trainer">
              <div className="thumb d-flex justify-content-sm-center">
                <img
                  className="img-fluid"
                  src="/assets/img/trainer/t1.jpg"
                  alt=""
                />
              </div>
              <div className="meta-text text-sm-center">
                <h4>Mated Nithan</h4>
                <p className="designation">Sr. web designer</p>
                <div className="mb-4">
                  <p></p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 single-trainer">
              <div className="thumb d-flex justify-content-sm-center">
                <img
                  className="img-fluid"
                  src="/assets/img/trainer/t2.jpg"
                  alt=""
                />
              </div>
              <div className="meta-text text-sm-center">
                <h4>David Cameron</h4>
                <p className="designation">Sr. web designer</p>
                <div className="mb-4">
                  <p></p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 single-trainer">
              <div className="thumb d-flex justify-content-sm-center">
                <img
                  className="img-fluid"
                  src="/assets/img/trainer/t3.jpg"
                  alt=""
                />
              </div>
              <div className="meta-text text-sm-center">
                <h4>Jain Redmel</h4>
                <p className="designation">Sr. Faculty Data Science</p>
                <div className="mb-4">
                  <p></p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 single-trainer">
              <div className="thumb d-flex justify-content-sm-center">
                <img
                  className="img-fluid"
                  src="/assets/img/trainer/t4.jpg"
                  alt=""
                />
              </div>
              <div className="meta-text text-sm-center">
                <h4>Nathan Macken</h4>
                <p className="designation">Sr. web designer</p>
                <div className="mb-4">
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*================ End Trainers Area =================*/}
    </>
  );
}
