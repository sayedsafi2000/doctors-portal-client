import React from 'react';
import chair from "../../../assets/images/chair.png"
const Banner = () => {
    return (
        <div className="mb-44" style={{ 
            backgroundImage: `url("../../../assets/images/bg.png")` ,
            backgroundPosition:"center",
            backgroundRepeat:"no-repeat",
            backgroundSize:"cover"
          }}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className=" md:w-full lg:w-1/2 rounded-lg shadow-2xl" alt=''/>
                <div>
                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button  className="btn  bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] text-white border-none">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;