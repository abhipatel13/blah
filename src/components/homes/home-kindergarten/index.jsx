import React from 'react';
import { FooterThree, HeaderThree } from '../../../layout';
import AboutArea from './about-area';
import AdBanner from './ad-banner';
import BlogArea from './blog-area';
import CategoryArea from './category-area';
import CoursesArea from './courses-area';
import EventArea from './event-area';
import FaqArea from './faq-area';
import HeroArea from './hero-area';
import TopCategories from './top-categories';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <HeaderThree/>
                <HeroArea/>
                <AboutArea/>
                <TopCategories />
                <CoursesArea/>
                <CategoryArea/>
                <FaqArea/>
                <FooterThree/>
            </div>
        </div>
    )
}

export default index;