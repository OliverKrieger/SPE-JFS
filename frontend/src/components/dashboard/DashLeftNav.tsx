import React from 'react';

interface DashLeftNavProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const DashLeftNav: React.FC<DashLeftNavProps> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { name: 'profile', label: 'Profile', icon: '👤' },
        { name: 'ships', label: 'Ships', icon: '🚀' }
    ];

    return (
        <nav className="left-nav sm:w-[150px] sm:flex-1 text-center sm:border-r-2 border-r-slate-600">
            <div className='flex sm:flex-col justify-center'>
                {tabs.map(tab => (
                    <div
                        key={tab.name}
                        className={activeTab === tab.name ? 'active' : ''}
                        onClick={() => setActiveTab(tab.name)}
                    >
                        <div className='p-4 cursor-pointer hover:bg-slate-500 transition-all ease-in-out'>
                            <span>{tab.icon}</span> {tab.label}
                        </div>
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default DashLeftNav;
