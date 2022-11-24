import React, { useContext } from 'react';
import Navbar from '../Pages/Home/Home/Shared/Navbar/Navbar';
import { Outlet, Link } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import { AuthContext } from '../AuthProvider';

const DashBoardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content  ">
                    <Outlet></Outlet>
                    {/* <label htmlFor="dashboard-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">

                        <li><Link to="/dashboard">My Appoinment</Link></li>
                        {
                            isAdmin &&
                            <>
                                <li><Link to="/dashboard/allusers">All Users</Link></li>
                                <li><Link to="/dashboard/adddoctor">Add A Doctor</Link></li>
                                <li><Link to="/dashboard/managedoctors">Manage Doctors</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>

        </div>
    );
};

export default DashBoardLayout;