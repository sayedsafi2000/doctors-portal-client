import React, { useState } from 'react';
import chair from "../../assets/images/chair.png";
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
const AppoinmentBanner = ({selectedDAte,setSelectedDAte}) => {
    
    return (
        <header>
            <div className="hero ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className="w-1/2 rounded-lg shadow-2xl" alt='' />
                    <div className='mx-10 card shadow-md p-10 bg-base-200'>
                        <DayPicker
                        mode='single'
                        selected={selectedDAte}
                        onSelect={setSelectedDAte}
                        ></DayPicker>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppoinmentBanner;