import React from 'react';
import treatment from "../../assets/images/treatment.png"
const MiddleBanner = () => {
    return (
        <div className="mt-24" style={{ 
            backgroundImage: `url("../../../assets/images/bg.png")` ,
            backgroundPosition:"center",
            backgroundRepeat:"no-repeat",
            backgroundSize:"cover"
          }}>
            <div className="hero-content flex-col-reverse lg:flex-row">
                <img src={treatment} className=" md:w-full lg:w-2/5 rounded-lg shadow-2xl" alt=''/>
                <div>
                    <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                    <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <button  className="btn  bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] text-white border-none">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default MiddleBanner;