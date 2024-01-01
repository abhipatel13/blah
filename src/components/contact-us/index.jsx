import React from 'react';
import { Footer, FooterThree, Header } from '../../layout';
import BreadcrumbThree from '../breadcrumb/breadcrumb-3';
import ContactMap from './contact-map';
import ContactUsArea from './contact-us-area';


const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <BreadcrumbThree title="Contact Us" subtitle="Contact Us" />
                <ContactUsArea/>
                <ContactMap/>
                <FooterThree/>
            </div>
        </div>
    )
}

export default index;