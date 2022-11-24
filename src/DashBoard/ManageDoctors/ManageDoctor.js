import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../../Loading/Loading';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Pages/Home/Home/Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctor = () => {
    const [deletingDoctor, setdeletingDoctor] = useState(null);
    const closeModal = () => {
        setdeletingDoctor(null);
    }
    // const handleDeleteDoctor = doctor=>{

    // }
    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            try {
                const res = await fetch("https://doctors-portal-server-two-omega.vercel.app/doctors", {
                    headers: {
                        authorization: ` bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                const data = await res.json()
                return data;
            }
            catch (error) {

            }
        }
    })
    const handleDelete = id => {
        fetch(`https://doctors-portal-server-two-omega.vercel.app/doctors/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Doctor ${deletingDoctor.name} deleted Successfully`)
                }
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-4xl'>Manage Doctors{doctors?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avater</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor, i) =>
                                <tr key={doctor._id}>
                                    <th>{i + 1}</th>
                                    <td><img className='rounded-full w-10 h-10' src={doctor.image} alt="avater" /></td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.email}</td>
                                    <td>{doctor.specialty}</td>
                                    <td><label onClick={() => setdeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-sm btn-error text-white">Delete</label>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    title={`Are You sure You want to delete?`}
                    message={`if you delete ${deletingDoctor.name}.It cannot be undone`}
                    closeModal={closeModal}
                    deletingDoctor={deletingDoctor}
                    handleDelete={handleDelete}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctor;