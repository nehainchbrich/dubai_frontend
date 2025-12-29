import { useAuth } from '@/helper/Auth';
import React, { useEffect, useState } from 'react';

const WelcomeBar = () => {
    const {user} = useAuth();
  return (
    <>
      <div className="welcome_bar">
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <h4>{`Hii, ${user.fullName}`}</h4>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .welcome_bar{
              margin-top:8rem;
          }
          h4 {
              text-transform: uppercase;
              font-size:18px;
          }
        `}
      </style>
    </>
  );
};

export default WelcomeBar;
