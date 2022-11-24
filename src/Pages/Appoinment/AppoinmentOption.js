import React from 'react';

const AppoinmentOption = ({ appoinmentOption, setTreatment }) => {
    const { name, price, slots } = appoinmentOption;
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center mt-10">
                <h2 className="text-xl font-bold text-secondary text-center">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : " Try anothe day"}</p>
                <p>{slots.length} {slots.length > 1 ? "space" : " spaces "} available</p>
                <p>Price : {price}</p>
                <div className="card-actions justify-center">

                    <label
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(appoinmentOption)}
                        htmlFor="booking-modal" className="btn btn-secondary text-white">Book Appoinment</label>
                </div>
            </div>
        </div>
    );
};

export default AppoinmentOption;