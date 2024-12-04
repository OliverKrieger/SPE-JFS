import React from 'react';

interface DashContentAreaProps {
    activeTab: string;
}

const DashContentArea: React.FC<DashContentAreaProps> = ({ activeTab }) => {
    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <div>Profile Content</div>;
            case 'ships':
                return <div>Ships Content</div>;
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
