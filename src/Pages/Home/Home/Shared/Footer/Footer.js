import React from 'react';
import { Link } from 'react-router-dom';
import footerBg from "../../../../../assets/images/footer.png"
const Footer = () => {
    return (
        <footer className=" p-10 text-neutral-content" style={{
            background: `url(${footerBg})`,
            backgroundPosition:"center",
            backgroundSize:"cover",
        }}>
            <div className='footer my-10'>
                <div>
                    <span className="footer-title text-black">Services</span>
                    <Link className="link  text-blacklink-hover text-black">Branding</Link>
                    <Link className="link link-hover text-black">Design</Link>
                    <Link className="link  text-blacklink-hover text-black">Marketing</Link>
                    <Link className="link  text-blacklink-hover text-black">Advertisement</Link>
                </div>
                <div>
                    <span className="footer-title text-black">Company</span>
                    <Link className="link link-hover text-black">About us</Link>
                    <Link className="link  text-black link-hover">Contact</Link>
                    <Link className="link text-black link-hover">Jobs</Link>
                    <Link className="link text-black link-hover">Press kit</Link>
                </div>
                <div>
                    <span className="footer-title text-black">Legal</span>
                    <Link className="link text-black link-hover">Terms of use</Link>
                    <Link className="link text-black link-hover">Privacy policy</Link>
                    <Link className="link text-black link-hover">Cookie policy</Link>
                </div>
            </div>
            <div className='w-full text-center'>
                <p className='text-black font-bold'>Copyright © 2022 - All right reserved by ACME Industries Ltd</p>
            </div>
        </footer>
    );
};

export default Footer;