import React, { useState } from 'react';
import DashHeader from '../components/dashboard/DashHeader';
import DashLeftNav from '../components/dashboard/DashLeftNav';
import DashContentArea from '../components/dashboard/DashContentArea';

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className='dashboard-container min-h-screen flex flex-col'>
            <DashHeader />
            <div className='dashboard-main-content flex flex-col sm:flex-row w-full flex-1'>
                <DashLeftNav activeTab={activeTab} setActiveTab={setActiveTab} />
                <DashContentArea activeTab={activeTab} />
            </div>
        </div>
    );
};

export default Dashboard;