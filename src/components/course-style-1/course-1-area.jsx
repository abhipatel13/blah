import React, { useEffect } from 'react';
import { useState } from 'react';
import { course_data } from '../../data';
import SortingArea from '../course-filter/sorting-area';
import CourseTypeOne from '../course/course-type-one';
import firebaseInitialization from '../../firebase/firebase.init';
import {getDatabase, onValue, ref} from 'firebase/database'
import { useRouter } from 'next/router';

const CourseArea = () => {

    const router = useRouter();
    const { category } = router.query;
    category?.replace("%20"," ")
    const [courses,setCourses] = useState([]);
    const database=getDatabase(firebaseInitialization())

useEffect(()=>{
  const query = ref(database,"Courses")
  return onValue(query,(snapshot)=>{
    const data = snapshot.val();

    if(snapshot.exists()){
        setCourses([])
        Object.values(data).filter(course=>course.category==category).map((course)=>{
            setCourses((courses)=>[...courses,course])
        })
    }
  })
},[category])
    
    const coursePerView = 8;
    const [next, setNext] = useState(coursePerView);


    // handleLoadData
    const handleLoadData = () => {
        setNext(value => value + 4)
    }
    return (
        <div className="edu-course-area course-area-1 gap-tb-text">
            <div className="container">
                <SortingArea course_items={courses} num={courses?.slice(0,next)?.length} setCourses={setCourses} courses={courses} />

                <div className="row g-5">
                    {courses.slice(0, next)?.map((course) => {
                        return (
                            <div key={course.id} className="col-md-6 col-xl-3">
                                <CourseTypeOne data={course} classes="course-box-shadow" />
                            </div>
                        )
                    })}
                </div>

                {next < courses.length && 
                    <div onClick={handleLoadData} className="load-more-btn" data-sal-delay="100" data-sal="slide-up" data-sal-duration="1200">
                        <a className="edu-btn" style={{ cursor: 'pointer' }}>Load More <i className="icon-56"></i></a>
                    </div>
                }
            </div>
        </div>
    )
}

export default CourseArea;