import React from 'react';
import Footer from '../Pages/Home/Home/Shared/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Home/Home/Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;