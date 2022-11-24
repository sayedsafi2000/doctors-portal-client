import React from 'react';

const Review = ({ reviews }) => {
    const { name, img, review, location } = reviews;
    return (
        <div className="card w-[385px]  bg-base-100 shadow-xl">
            <div className="card-body">
                <p>{review}</p>
                <div className="card-actions  mt-7">
                    <img className='border-2 p-[1px] border-primary rounded-full w-16' src={img} alt="" />
                    <div>
                        <h2 className="text-md">Winson Herry</h2>
                        <small>California</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;