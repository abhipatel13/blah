import React, { useEffect, useState } from "react";
import { FooterThree, Header } from "../layout";
import firebaseInitialization from "../firebase/firebase.init";
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SortingArea from "../components/course-filter/sorting-area";
import CourseTypeOne from "../components/course/course-type-one";
import Link from "next/link";

const purchaseCourse = () => {
  const [courses, setCourses] = useState([]);
  const database = getDatabase(firebaseInitialization());
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const query = ref(database, `users/${user.uid}`);
        return onValue(query, (snapshot) => {
          const data = snapshot.val();

          if (snapshot.exists()) {
            setCourses([]);
            Object.values(data).map((course) => {
              setCourses((courses) => [...courses, course]);
            });
          }
        });
      }
    });
  },[]);
  const coursePerView = 1000;
  const [next, setNext] = useState(coursePerView);

  // handleLoadData
  const handleLoadData = () => {
    setNext((value) => value + 4);
  };
  console.log(courses);
  return (
    <div className="sticky-header">
      <div id="main-wrapper" className="main-wrapper">
        <Header no_top_bar={true} />
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
                return(<div key={course.id} className="col-md-6 col-xl-3">
                  <div
                    className="edu-course course-style-1 course-box-shadow hover-button-bg-white"
                  >
                    <div className="inner">
                      <div className="thumbnail">
                        <Link href={`/${course.category}/${course.id}`}>
                          <a>
                            <img
                              src={`${course.img}`}
                              alt="Course Meta"
                            />
                          </a>
                        </Link>
                       
                      </div>
                      <div className="content">

                        <h6 className="title">
                          <a href="#">{course.title}</a>
                        </h6>
                      
                        <div className="course-price">${course.price}</div>
                       
                      </div>
                    </div>

                    <div className="course-hover-content">
                      <div className="content">
            
                        <h6 className="title">
                          <Link href={`/courses/${course.category}/${course.id}`}>
                            <a>{course.title}</a>
                          </Link>
                        </h6>
                        <div className="course-price">${course.price}</div>
                       
                      </div>
                    </div>
                  </div>
                </div>);
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
        <FooterThree />
      </div>
    </div>
  );
};

export default purchaseCourse;
