import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import Logout from '../login/Logout';


const DashHeader: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div className="header">
            <div className="username">
                {user ? (
                    <span>{user.username}</span>
                ) : (
                    <span>Error</span>
                )}
            </div>
            <Logout />
        </div>
    );
};

export default DashHeader;
