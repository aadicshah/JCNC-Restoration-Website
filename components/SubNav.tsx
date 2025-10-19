
import React from 'react';
import type { TabKey } from '../types';

interface SubNavProps {
    activeTab: TabKey;
    onTabClick: (tab: TabKey) => void;
    tabs: { key: TabKey, label: string }[];
}

const SubNav: React.FC<SubNavProps> = ({ activeTab, onTabClick, tabs }) => {
    return (
        <div className="sticky top-0 z-20 bg-white border-b-4 border-jcnc-gold shadow-lg">
            <div className="container mx-auto w-[min(1200px,92vw)] flex gap-1.5 overflow-x-auto whitespace-nowrap p-2" role="tablist" aria-label="Section navigation">
                {tabs.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => onTabClick(key)}
                        className={`appearance-none bg-transparent border-none py-3 px-4 font-bold text-jcnc-blue cursor-pointer rounded-xl relative text-base transition-colors ${activeTab === key ? 'text-jcnc-gold' : ''}`}
                        role="tab"
                        aria-selected={activeTab === key}
                    >
                        {label}
                        {activeTab === key && (
                            <span className="absolute left-3 right-3 bottom-1 h-1 bg-jcnc-red rounded-full"></span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SubNav;
