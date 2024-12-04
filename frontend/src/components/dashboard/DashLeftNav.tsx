interface DashLeftNavProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const DashLeftNav: React.FC<DashLeftNavProps> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { name: 'profile', label: 'Profile', icon: '👤' },
        { name: 'ships', label: 'Ships', icon: '🚀' },
        { name: 'settings', label: 'Settings', icon: '⚙️' },
    ];

    return (
        <nav className="left-nav">
            <ul>
                {tabs.map(tab => (
                    <li
                        key={tab.name}
                        className={activeTab === tab.name ? 'active' : ''}
                        onClick={() => setActiveTab(tab.name)}
                    >
                        <span>{tab.icon}</span> {tab.label}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default DashLeftNav;
