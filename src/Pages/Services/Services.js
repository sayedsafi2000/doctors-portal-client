import React from 'react';
import fluride from "../../assets/images/fluoride.png";
import cavity from "../../assets/images/cavity.png";
import whitening from "../../assets/images/whitening.png";
import Service from './Service';
const Services = () => {
    const cardData = [
        {
            id: 1,
            name: "Fluoride Treatment",
            description: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            icon: fluride
        },
        {
            id: 2,
            name: "Cavity Filling",
            description: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            icon: cavity, 
        },
        {
            id: 3,
            name: "Teeth Whitening",
            description: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            icon: whitening
        },
    ]
    return (
        <div className='mt-16 text-center'>
            <div className='my-20'>
                <h3 className='text-primary text-xl font-bold'>Our Services</h3>
                <h1 className='text-3xl '>Services we Provide</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    cardData.map(service => <Service
                    key={service.id}
                    service={service}
                    ></Service>)
                }
            </div>
        </div>
    );
};

export default Services;