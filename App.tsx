import React, { useState, useEffect } from 'react';
import type { TabKey, Donor, CampaignProgress, AdminUser } from './types';
import { INITIAL_DONORS, TABS, LABH_TIERS } from './constants';
import Hero from './components/Hero';
import SubNav from './components/SubNav';
import Cause from './components/Cause';
import Donors from './components/Donors';
import AdminPortal from './components/AdminPortal';
import Faq from './components/Faq';
import Architecture from './components/Architecture';
import Labhs from './components/Labhs';
import Contact from './components/Contact';
import PledgeForm from './components/PledgeForm';
import LabhBenefits from './components/LabhBenefits';
import Login from './components/Login';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabKey>('cause');
    const [donors, setDonors] = useState<Donor[]>(INITIAL_DONORS);
    const [progress, setProgress] = useState<CampaignProgress>({
        goal: 2000000,
        raised: 850000,
    });
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);

    // Load admin users from local storage on initial load
    useEffect(() => {
        const storedUsers = localStorage.getItem('jcnc-admin-users');
        if (storedUsers) {
            setAdminUsers(JSON.parse(storedUsers));
        } else {
            // Set default admin if none exists
            const defaultAdmins = [{ username: 'admin', password: 'password' }];
            localStorage.setItem('jcnc-admin-users', JSON.stringify(defaultAdmins));
            setAdminUsers(defaultAdmins);
        }
    }, []);

    // Save admin users to local storage whenever they change
    useEffect(() => {
        // Don't save empty array on initial load before hydration
        if (adminUsers.length > 0) {
            localStorage.setItem('jcnc-admin-users', JSON.stringify(adminUsers));
        }
    }, [adminUsers]);


    // Check session storage on initial load to maintain login state
    useEffect(() => {
        if (sessionStorage.getItem('jcnc-admin-auth') === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleTabClick = (tabKey: TabKey) => {
        setActiveTab(tabKey);
        const element = document.getElementById(tabKey);
        if (element) {
            setTimeout(() => {
                 element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
        window.location.hash = tabKey;
    };
    
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '') as TabKey;
            if (TABS.some(tab => tab.key === hash)) {
                setActiveTab(hash);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const handleLogin = (username: string, password: string) => {
        const user = adminUsers.find(u => u.username === username && u.password === password);
        if (user) {
            setIsAuthenticated(true);
            setLoginError(null);
            sessionStorage.setItem('jcnc-admin-auth', 'true');
        } else {
            setLoginError('Incorrect username or password. Please try again.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('jcnc-admin-auth');
        handleTabClick('cause'); // Redirect to home page after logout
    };

    const visibleTabs = TABS.filter(tab => tab.key !== 'labh-benefits').map(tab => {
        if (tab.key === 'admin') {
            return { ...tab, label: isAuthenticated ? 'Admin Portal' : 'Admin Login' };
        }
        return tab;
    });

    return (
        <div className="bg-jcnc-cream min-h-screen">
            <Hero onPledgeNow={() => handleTabClick('donate-form')} onLearnMore={() => handleTabClick('cause')} />
            <SubNav activeTab={activeTab} onTabClick={handleTabClick} tabs={visibleTabs} />
            
            <main>
                <TabShell id="cause" active={activeTab === 'cause'}>
                    <Cause progress={progress} />
                </TabShell>
                 <TabShell id="arch" active={activeTab === 'arch'}>
                    <Architecture />
                </TabShell>
                 <TabShell id="labhs" active={activeTab === 'labhs'}>
                    <Labhs 
                      labhTiers={LABH_TIERS} 
                      onPledgeNow={() => handleTabClick('donate-form')}
                      onViewBenefits={() => handleTabClick('labh-benefits')}
                    />
                </TabShell>
                <TabShell id="donors" active={activeTab === 'donors'}>
                    <Donors donors={donors} />
                </TabShell>
                 <TabShell id="contact" active={activeTab === 'contact'}>
                    <Contact onPledgeNow={() => handleTabClick('donate-form')} />
                </TabShell>
                <TabShell id="faq" active={activeTab === 'faq'}>
                    <Faq />
                </TabShell>
                <TabShell id="donate-form" active={activeTab === 'donate-form'}>
                    <PledgeForm />
                </TabShell>
                 <TabShell id="labh-benefits" active={activeTab === 'labh-benefits'}>
                    <LabhBenefits />
                </TabShell>
                <TabShell id="admin" active={activeTab === 'admin'}>
                    {!isAuthenticated ? (
                        <Login onLogin={handleLogin} error={loginError} />
                    ) : (
                        <AdminPortal
                            donors={donors}
                            setDonors={setDonors}
                            progress={progress}
                            setProgress={setProgress}
                            onLogout={handleLogout}
                            adminUsers={adminUsers}
                            setAdminUsers={setAdminUsers}
                        />
                    )}
                </TabShell>
            </main>
            
            <footer className="text-center py-9 px-0 text-muted">
                <div className="container mx-auto">© JCNC • Jirnodhar Campaign • Thank you for your Seva & Anumodna</div>
            </footer>
        </div>
    );
};

interface TabShellProps {
    id: string;
    active: boolean;
    children: React.ReactNode;
}

const TabShell: React.FC<TabShellProps> = ({ id, active, children }) => {
    return (
        <section id={id} className={`py-14 ${active ? 'block' : 'hidden'}`}>
             <div className="container mx-auto w-[min(1200px,92vw)]">
                {children}
            </div>
        </section>
    );
};


export default App;