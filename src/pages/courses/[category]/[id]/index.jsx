import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SEO from '../../../../components/seo';
import { course_data } from '../../../../data';
import { Wrapper } from '../../../../layout';
import CourseDetailsMain from '../../../../components/course-details';
import firebaseInitialization from '../../../../firebase/firebase.init';
import { getDatabase, onValue, ref } from 'firebase/database';

const DynamicCourseDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const {category} = router.query;
const [courses,setCourses] = useState([]);
const database=getDatabase(firebaseInitialization())

useEffect(()=>{
  const query = ref(database,"Courses")
  return onValue(query,(snapshot)=>{
    const data = snapshot.val();

    if(snapshot.exists()){
        Object.values(data).map((course)=>{
            setCourses((courses)=>[...courses,course])
        })
    }
  })
},[])
    const course = courses.find(item => Number(item.id) === Number(id))
    return (
        <Wrapper>
            <SEO pageTitle={'Course Details'} />
            <CourseDetailsMain course={course} />
        </Wrapper>
    )
}

export default DynamicCourseDetails;

export async function getStaticPaths() {
    const data =  await course_data()
    const paths = data.map((course) => {
        
        return {
            params:{
                id:`${course.id}`,
                category:`${course.category}`
            }
        }
    })
    return {
      paths,
      fallback: false,
    }
  }

export async function getStaticProps(context) {
    return {
        props: {}
    }
}