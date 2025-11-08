import React from 'react';
import useAuth from '../../Hooks/useAuth';
import UserDashboard from '../../Dashboard/UserDashboard/UserDashboard';
import { Helmet } from 'react-helmet-async';

const AdminHome = () => {
    const {user}=useAuth()
    return (
        <div>
          <Helmet>
        <title>CareNest Pharmacy | Dashboard </title>
       
      </Helmet>
            <h2 className='text-3xl' >
             
                <UserDashboard></UserDashboard>
                
            </h2>
        </div>
    );
};

export default AdminHome;