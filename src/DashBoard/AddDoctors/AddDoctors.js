import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading/Loading';

const AddDoctors = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key
    const navigate = useNavigate();
    const { data: specialties, isLoading } = useQuery({
        queryKey: ["specialty"],
        queryFn: async () => {
            const res = await fetch("https://doctors-portal-server-two-omega.vercel.app/appoinmentSpecialty");
            const data = await res.json();
            return data;
        }
    })
    const handleAddDoctor = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?&key=${imageHostKey}`
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    }
                    fetch("https://doctors-portal-server-two-omega.vercel.app/doctors",{
                        method:"POST",
                        headers:{
                            "content-type":"application/json",
                            authorization:` bearer ${localStorage.getItem("accessToken")}`
                        },
                        body:JSON.stringify(doctor)
                    })
                    .then(res => res.json())
                    .then(result=>{
                        console.log(result)
                        toast.success(`${data.name} is added successfully`)
                        navigate("/dashboard/managedoctors")
                    })
                    console.log(imgData.data.url)
                }
            })
        console.log(image)
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='w-96 p-7'>
            <h2 className='text-4xl'>Add a Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="form-control w-full max-w-xs mt-3">
                    <label className="label"><span className="label-text">Name</span>
                    </label>
                    <input {...register("name")} type="name" placeholder="Enter Your Name" className="input input-bordered w-full max-w-xs mt-3" required />
                </div>
                <div className="form-control w-full max-w-xs mt-3">
                    <label className="label"><span className="label-text">Email</span>
                    </label>
                    <input {...register("email", { required: true })} type="email" placeholder="Type here" className="input input-bordered w-full max-w-xs mt-3" />
                </div>
                <div className="form-control w-full max-w-xs mt-3">
                    <label className="label"><span className="label-text">Speciality</span>
                    </label>
                    <select
                        {...register("specialty")}
                        className="select select-ghost w-full max-w-xs input input-bordered">
                        {
                            specialties?.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                        }
                    </select>
                </div>
                <div className="form-control w-full max-w-xs mt-3">
                    <label className="label"><span className="label-text">Photo</span>
                    </label>
                    <input {...register("image", {
                        required: "Photo is required"
                    })} type="file" className="input input-bordered w-full max-w-xs mt-3" />
                </div>
                <input className='btn btn-gray-900 w-full mt-3 ' type="submit" value="ADD DOCTOR" />
            </form>
        </div>
    );
};

export default AddDoctors;