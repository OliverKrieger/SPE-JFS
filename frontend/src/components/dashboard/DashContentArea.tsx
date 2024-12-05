import React from 'react';

import ShipList from '../ships/ShipList';
import Account from '../profile/Account';

interface DashContentAreaProps {
    activeTab: string;
}

const DashContentArea: React.FC<DashContentAreaProps> = ({ activeTab }) => {
    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <Account />
            case 'ships':
                return <ShipList />
            default:
                return <div>Select a tab</div>;
        }
    };

    return (
        <div className="content-area w-full">
            {renderContent()}
        </div>
    );
};

export default DashContentArea;
