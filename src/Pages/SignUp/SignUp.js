import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import useToken from '../../Hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [signUpError, setsignUpError] = useState("")
    const [createdUserEmail,setcreatedUserEmail]= useState("");
    const [token] = useToken(createdUserEmail);

    if(token){
        navigate("/");
    }

    const handleSignup = data => {
        setsignUpError("");
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                // toast.success("User create Successfully")
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email)
                    })
                    .catch(err => console.log(err));

            })
            .catch(err => {
                setsignUpError(err.message)
                console.log(err)
            })
        console.log(data)
        console.log(errors)
    }
    const saveUser = (name, email) => {
        const user = { name, email };
        fetch("https://doctors-portal-server-two-omega.vercel.app/users", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setcreatedUserEmail(email)
                console.log(data)
            })
    }

    return (
        <div className='h-[800px] mx-auto flex justify-center items-center'>
            <div className='w-96 p-7 shadow-md border-2'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignup)}>
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
                        <label className="label"><span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "password required",
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: "Password must be strong" },
                            minLength: { value: 8, message: "Password must be 8 charactur" }
                        })} placeholder="Type here" className="input input-bordered w-full max-w-xs mt-3" />
                        {
                            errors?.password && <p className='text-red-600'>{errors?.password?.message}</p>
                        }
                        <label className="label"><span className="label-text mt-3">Forgate Password</span>
                        </label>
                    </div>
                    <input className='btn btn-gray-900 w-full mt-3' type="submit" value="Sign Up" />
                </form>
                {signUpError && <p className='text-red-600'>{signUpError}</p>}
                <p className='my-3'>Already have an account?<Link className='text-primary mt-3' to="/login">Please Signin</Link></p>
                <div className="divider">OR</div>
                <button className='w-full btn btn-outline btn-ghost mt-3'>Continue With Google</button>
            </div>
        </div>
    );
};

export default SignUp;