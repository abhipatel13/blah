import React from 'react';
import { Footer, FooterThree, Header } from '../../layout';
import BreadcrumbThree from '../breadcrumb/breadcrumb-3';
import CourseArea from './course-1-area';
import { useRouter } from 'next/router';

const index = () => {
    const router = useRouter();
    const { category } = router.query;
    category?.replace("%20"," ")  
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <BreadcrumbThree title="Courses" subtitle={category} />
                <CourseArea/>
                <FooterThree/>
            </div>
        </div>
    )
}

export default index;