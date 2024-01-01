import React from 'react';
import { Footer, FooterThree, Header } from '../../layout';
import BreadcrumbThree from '../breadcrumb/breadcrumb-3';
import CartArea from './cart-area';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <BreadcrumbThree title="Cart Page" subtitle="Cart Page" />
                <CartArea/>
                <FooterThree/>
            </div>
        </div>
    )
}

export default index;