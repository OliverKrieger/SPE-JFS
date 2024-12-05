import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OverlayContextProps {
    openOverlay: (content: ReactNode) => void;
    closeOverlay: () => void;
}

const OverlayContext = createContext<OverlayContextProps | undefined>(undefined);

export const useOverlay = () => {
    const context = useContext(OverlayContext);
    if (!context) {
        throw new Error('useOverlay must be used within an OverlayProvider');
    }
    return context;
};

export const OverlayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOverlayOpen, setOverlayOpen] = useState(false);
    const [overlayContent, setOverlayContent] = useState<ReactNode>(null);

    const openOverlay = (content: ReactNode) => {
        setOverlayContent(content);
        setOverlayOpen(true);
    };

    const closeOverlay = () => {
        setOverlayOpen(false);
        setOverlayContent(null);
    };

    return (
        <OverlayContext.Provider value={{ openOverlay, closeOverlay }}>
            {children}
            {isOverlayOpen && (
                <div onClick={closeOverlay} className="fixed inset-0 bg-black bg-opacity-75 cursor-pointer flex justify-center z-50 overflow-auto">
                    <div className="p-6 rounded-lg shadow-lg relative">
                        <div className='animate-slideInRight'>
                            {overlayContent}
                        </div>
                    </div>
                </div>
            )}
        </OverlayContext.Provider>
    );
};