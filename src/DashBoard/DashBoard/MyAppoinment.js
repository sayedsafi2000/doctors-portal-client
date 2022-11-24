import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';


const MyAppoinment = () => {
    const { user } = useContext(AuthContext);

    const url = `
    https://doctors-portal-server-two-omega.vercel.app/bookings?email=${user?.email}`;

    const { data: bookings = [] } = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <h2 className='text-3xl mb-5'>My Appoinment</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, i) =>
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{booking.patient}</td>
                                    <td>{booking.treatment}</td>
                                    <td>{booking.appoinmentDate}</td>
                                    <td>{booking.slot}</td>
                                    <td>{booking.price}</td>
                                    <td>
                                        {
                                            booking?.price && !booking?.paid && 
                                            <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-secondary text-white btn-sm'>Pay</button></Link>
                                        }
                                        {
                                            booking?.price && booking.paid && <span className='text-primary '>Paid</span>
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppoinment;