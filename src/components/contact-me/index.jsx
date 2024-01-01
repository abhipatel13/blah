import React from 'react';
import { Footer, FooterThree, Header } from '../../layout';
import BreadcrumbThree from '../breadcrumb/breadcrumb-3';
import ContactMeArea from './contact-me-area';
import ContactMeFormArea from './contact-me-form-area';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <BreadcrumbThree title="Contact Me" subtitle="Contact Me" />
                <ContactMeArea/>
                <ContactMeFormArea/>
                <FooterThree/>
            </div>
        </div>
    )
}

export default index;