import React, { useEffect, useState } from "react";
import { Footer, Header, Wrapper } from "../layout";
import { motion } from "framer-motion";
import SEO from "../components/seo";
import CourseStyleOneMain from "../components/course-style-1";
import BreadcrumbThree from "../components/breadcrumb/breadcrumb-3";
import CourseArea from "../components/course-style-1/course-1-area";
import { useMouseMoveUI } from "../contexts/mouse-move-context";
import Link from "next/link";
import firebaseInitialization from "../firebase/firebase.init";
import { getDatabase, onValue, ref } from "firebase/database";
import SortingArea from "../components/course-filter/sorting-area";
import CourseTypeOne from "../components/course/course-type-one";
const courses = () => {
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
 
  const [courses,setCourses] = useState([]);
  const database=getDatabase(firebaseInitialization())

useEffect(()=>{
const query = ref(database,"Courses")
return onValue(query,(snapshot)=>{
  const data = snapshot.val();

  if(snapshot.exists()){
      setCourses([])
      Object.values(data).map((course)=>{
          setCourses((courses)=>[...courses,course])
      })
  }
})
},[])
  
  const coursePerView = 100;
  const [next, setNext] = useState(coursePerView);


  // handleLoadData
  const handleLoadData = () => {
      setNext(value => value + 4)
  }
  return (
    <Wrapper>
      <SEO pageTitle={"Courses"} />
      <div className="sticky-header">
        <div id="main-wrapper" className="main-wrapper">
          <Header no_top_bar={true} />
          <div className="edu-breadcrumb-area">
            <div className="container">
              <div className="breadcrumb-inner">
                <div className="page-title">
                  <h1 className="title">Courses</h1>
                </div>
                <ul className="edu-breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li className="separator">
                    <i className="icon-angle-right"></i>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Courses</a>
                  </li>
                </ul>
              </div>
            </div>
            <ul className="shape-group">
              <li className="shape-1">
                <span></span>
              </li>
              <motion.li
                className="shape-2 scene"
                animate={{
                  x: mouseReverse(40).x,
                  y: mouseReverse(40).y,
                }}
              >
                <img src="/assets/images/about/shape-13.png" alt="shape" />
              </motion.li>
              <motion.li
                className="shape-3 scene"
                animate={{
                  x: mouseDirection(40).x,
                  y: mouseDirection(40).y,
                }}
              >
                <img src="/assets/images/about/shape-15.png" alt="shape" />
              </motion.li>
              <li className="shape-4">
                <span></span>
              </li>
              <motion.li
                className="shape-5 scene"
                animate={{
                  x: mouseReverse(40).x,
                  y: mouseReverse(40).y,
                }}
              >
                <img src="/assets/images/about/shape-07.png" alt="shape" />
              </motion.li>
            </ul>
          </div>
          <div className="edu-course-area course-area-1 gap-tb-text">
            <div className="container">
              <SortingArea
                course_items={courses}
                num={courses?.slice(0, next)?.length}
                setCourses={setCourses}
                courses={courses}
              />

              <div className="row g-5">
                {courses.slice(0, next)?.map((course) => {
                  return (
                    <div key={course.id} className="col-md-6 col-xl-3">
                      <CourseTypeOne
                        data={course}
                        classes="course-box-shadow"
                      />
                    </div>
                  );
                })}
              </div>

              {next < courses.length && (
                <div
                  onClick={handleLoadData}
                  className="load-more-btn"
                  data-sal-delay="100"
                  data-sal="slide-up"
                  data-sal-duration="1200"
                >
                  <a className="edu-btn" style={{ cursor: "pointer" }}>
                    Load More <i className="icon-56"></i>
                  </a>
                </div>
              )}
            </div>
          </div>
          <Footer style_2={"footer-dark bg-image footer-style-2"} />
        </div>
      </div>
    </Wrapper>
  );
};

export default courses;
