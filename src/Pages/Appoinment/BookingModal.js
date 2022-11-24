import { format } from 'date-fns';
import { AuthContext } from '../../AuthProvider';
import React, { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';

const BookingModal = ({ treatment, selectedDAte, setTreatment, refetch }) => {
    const { user } = useContext(AuthContext);
    const { slots,price } = treatment;
    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const booking = {
            appoinmentDate: format(selectedDAte, "PP"),
            treatment: treatment.name,
            patient: name,
            slot,
            email,
            phone,
            price
        }
        fetch("https://doctors-portal-server-two-omega.vercel.app/bookings", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => { 
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success("Booking Confirmed")
                    refetch();
                    console.log(data)
                }
                else{
                    toast.error(data.message)
                }
            })


    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{treatment.name}</h3>
                    <form onSubmit={handleBooking} action="" className='grid grid-cols-1 gap-3'>
                        <input type="text" disabled value={format(selectedDAte, "PP")} className="input input-bordered w-full " />
                        <select name='slot' className="select select-bordered w-full max-w-xs">
                            {
                                slots.map((slot, i) => <option value={slot}
                                    key={i}
                                >{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Enter Full Name" className="input input-bordered w-full " />
                        <input name='email' defaultValue={user?.email} disabled type="email" placeholder="Enter Your Email" className="input input-bordered w-full " />
                        <input name='phone' type="number" placeholder="Enter Phone" className="input input-bordered w-full " /><br />
                        <input className='btn w-full  bg-gray-900' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;