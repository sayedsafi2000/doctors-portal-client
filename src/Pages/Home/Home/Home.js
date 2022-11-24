import React from 'react';
import MakeAppoinment from '../../MakeAppoinment/MakeAppoinment';
import MiddleBanner from '../../MiddleBanner/MiddleBanner';
import Services from '../../Services/Services';
import Testimonial from '../../Testimonial/Testimonial';
import Banner from '../Banner/Banner';
import InfoCards from '../InfoCard/InfoCards';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <MiddleBanner></MiddleBanner>
            <MakeAppoinment></MakeAppoinment>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;