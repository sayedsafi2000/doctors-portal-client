import {  useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState,useContext } from 'react';
import Loading from '../../Loading/Loading';

import AppoinmentOption from './AppoinmentOption';
import BookingModal from './BookingModal';

const AvailableAppoinments = ({ selectedDAte }) => {
    const [treatment, setTreatment] = useState(null);

    const date = format(selectedDAte,'PP')

    const { data: appoinmentOptions = [] ,refetch,isLoading} = useQuery({
        queryKey: ["appoinmentOption",date],
        queryFn:async () => {
            const res = await fetch(`https://doctors-portal-server-two-omega.vercel.app/appoinmentOption?date=${date}`)
            const data = await res.json();
            return data
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <section className='my-16'>
            <h2 className='text-secondary text-center font-bold'>Available Appointments on {format(selectedDAte, "PP")}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-10/12 mx-auto'>
                {
                    appoinmentOptions.map(option => <AppoinmentOption
                        appoinmentOption={option}
                        key={option._id}
                        setTreatment={setTreatment}
                    ></AppoinmentOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                    treatment={treatment}
                    selectedDAte={selectedDAte}
                    setTreatment={setTreatment}
                    refetch={refetch}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppoinments;