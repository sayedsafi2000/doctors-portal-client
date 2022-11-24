import React from 'react';
import quots from "../../assets/icons/quote.svg";
import people1 from "../../assets/images/people1.png";
import people2 from "../../assets/images/people2.png";
import people3 from "../../assets/images/people3.png";
import Review from './Review';
const Testimonial = () => {
    const reviews = [
        {
            id: 1,
            name: "Winson Herry",
            review: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            location:"California" ,
                img: people1
        },
        {
            id: 2,
            name: "Winson Herry",
            review: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            location: "California",
                img: people2
        },
        {
            id: 3,
            name: "Winson Herry",
            review: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            location: "California",
                img: people3
        },
    ]
    return (
        <section>
            <div className='flex  justify-between items-center'>
                <div>
                    <h4 className='text-primary font-bold'>Testimonial</h4>
                    <h2 className="text-4xl">
                        What Our Patients Says
                    </h2>
                </div>
                <div>
                    <figure>
                        <img className=' w-24 lg:w-48 h-36' src={quots} alt="" />
                    </figure>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14'>
                {
                    reviews.map(reviews => <Review
                        key={reviews.id}
                        reviews={reviews}
                    ></Review>)
                }
            </div>
        </section>
    );
};

export default Testimonial;