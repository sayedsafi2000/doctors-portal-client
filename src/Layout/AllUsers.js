import React from 'react';
import { useQuery } from "@tanstack/react-query"
import { async } from '@firebase/util';
import toast from 'react-hot-toast';
const AllUsers = () => {
    const { data: users = [] ,refetch} = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch("https://doctors-portal-server-two-omega.vercel.app/users");
            const data = await res.json();
            return data;
        }
    })
    const handleMakeAdmin = (id)=>{
        fetch(`https://doctors-portal-server-two-omega.vercel.app/users/admin/${id}`,{
            method:"PUT",
            headers:{
                authorization : `bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount > 0){
                toast.success("Make admin Successfull");
                refetch();
            }
        })

    }
    return (
        <div>
            <h2>All Users</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin Action</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user,i) =>
                                <tr key={i}>
                                    <th>{i+1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{
                                        user?.role !== "admin" && <button 
                                        onClick={()=>handleMakeAdmin(user._id)} className='btn btn-xs btn-secondary text-white'>Make Admin</button>
                                        }</td>
                                    <td><button className='btn btn-xs bg-red-600 text-white'>Delete</button></td>
                                </tr>
                            )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;