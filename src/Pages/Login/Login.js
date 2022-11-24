import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import useToken from '../../Hooks/useToken';
const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);
    const [loginError, setloginError] = useState("");
    const [loginUserEmail,setloginUserEmail]=useState("");
    const [token]=useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"
    if(token){
        navigate(from,{replace: true})
    }
    const handleLogin = data => {
        setloginError("");
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setloginUserEmail(data.email)
                
            })
            .catch(err => {
                console.log(err.message)
                setloginError(err.message)
            })
    }
    return (
        <div className='h-[800px] mx-auto flex justify-center items-center'>
            <div className='w-96 p-7 shadow-md border-2'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs mt-3">
                        <label className="label"><span className="label-text">Email</span>
                        </label>
                        <input {...register("email", { required: "Email Address is required" })} type="email" placeholder="Type here" className="input input-bordered w-full max-w-xs mt-3" />
                        {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs mt-3">
                        <label className="label"><span className="label-text">Password</span>
                        </label>
                        <input {...register("password", { required: "Enter Password Bro..", minLength: { value: 8, message: "Password must be 8 charactur" } })} type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs mt-3" />
                        {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}
                        <label className="label"><span className="label-text mt-3">Forgate Password</span>
                        </label>
                    </div>
                    <input className='btn btn-gray-900 w-full mt-3' type="submit" value="Login" />
                </form>
                <p className='text-red-600'>{loginError}</p>
                <p className='my-3'>New to doctor's portal <Link className='text-primary mt-3' to="/signup">Create New Account</Link></p>
                <div className="divider">OR</div>
                <button className='w-full btn btn-outline btn-ghost mt-3'>Continue With Google</button>
            </div>
        </div>
    );
};

export default Login;