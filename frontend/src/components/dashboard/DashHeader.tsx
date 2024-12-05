import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import Logout from '../login/Logout';


const DashHeader: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div className="header w-full flex flex-col items-end border-b-2 border-b-slate-600">
            <div className='text-center max-w-96 p-2'>
                <div className="username">
                    {user ? (
                        <span className='text-xl'>{user.username}</span>
                    ) : (
                        <span>Error</span>
                    )}
                </div>
                <Logout />
            </div>
        </div>
    );
};

export default DashHeader;
