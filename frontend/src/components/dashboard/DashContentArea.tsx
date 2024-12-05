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
            case 'settings':
                return <div>Settings Content</div>;
            default:
                return <div>Select a tab</div>;
        }
    };

    return (
        <div className="content-area">
            {renderContent()}
        </div>
    );
};

export default DashContentArea;
