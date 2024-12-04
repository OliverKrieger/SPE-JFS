import React, { useState } from 'react';
import DashHeader from '../components/dashboard/DashHeader';
import DashLeftNav from '../components/dashboard/DashLeftNav';
import DashContentArea from '../components/dashboard/DashContentArea';

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className='dashboard-container'>
            <DashHeader />
            <div className='dashboard-main-content'>
                <DashLeftNav activeTab={activeTab} setActiveTab={setActiveTab} />
                <DashContentArea activeTab={activeTab} />
            </div>
        </div>
    );
};

export default Dashboard;