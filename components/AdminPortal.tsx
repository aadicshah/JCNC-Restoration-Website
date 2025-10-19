import React, { useState, useRef } from 'react';
import type { Donor, CampaignProgress, AdminUser } from '../types';

interface AdminPortalProps {
    donors: Donor[];
    setDonors: React.Dispatch<React.SetStateAction<Donor[]>>;
    progress: CampaignProgress;
    setProgress: React.Dispatch<React.SetStateAction<CampaignProgress>>;
    onLogout: () => void;
    adminUsers: AdminUser[];
    setAdminUsers: React.Dispatch<React.SetStateAction<AdminUser[]>>;
}

const AdminPortal: React.FC<AdminPortalProps> = ({ donors, setDonors, progress, setProgress, onLogout, adminUsers, setAdminUsers }) => {
    // State for new donor form
    const [donorName, setDonorName] = useState('');
    const [labhType, setLabhType] = useState('');
    const [isMajor, setIsMajor] = useState(true);
    const [newDonorImage, setNewDonorImage] = useState<File | null>(null);
    
    // State for progress form
    const [raisedAmount, setRaisedAmount] = useState(progress.raised);

    // State for new admin form
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Ref for the hidden file input used for editing images
    const editFileInputRef = useRef<HTMLInputElement>(null);
    const [editingDonorId, setEditingDonorId] = useState<number | null>(null);

    const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

    const handleAddDonor = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!donorName || !labhType) return;

        let imageUrl = `https://picsum.photos/seed/${donorName.split(' ').join('')}/${isMajor ? '220/200' : '220/140'}`;
        if (newDonorImage) {
            imageUrl = await toBase64(newDonorImage);
        }

        const newDonor: Donor = {
            id: Date.now(),
            name: donorName,
            labhType,
            imageUrl,
            isMajor,
        };
        setDonors(prev => [newDonor, ...prev]);

        // Reset form
        setDonorName('');
        setLabhType('');
        setIsMajor(true);
        setNewDonorImage(null);
        const newDonorFileInput = document.getElementById('newDonorImage') as HTMLInputElement;
        if (newDonorFileInput) newDonorFileInput.value = '';
    };
    
    const handleDeleteDonor = (id: number) => {
        setDonors(donors.filter(donor => donor.id !== id));
    };

    const handleUpdateProgress = (e: React.FormEvent) => {
        e.preventDefault();
        setProgress(prev => ({ ...prev, raised: Number(raisedAmount) }));
        alert('Campaign progress updated!');
    };

    const handleChangeImageClick = (donorId: number) => {
        setEditingDonorId(donorId);
        editFileInputRef.current?.click();
    };

    const handleEditImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && editingDonorId !== null) {
            const file = e.target.files[0];
            const base64 = await toBase64(file);
            setDonors(prevDonors => 
                prevDonors.map(d => 
                    d.id === editingDonorId ? { ...d, imageUrl: base64 } : d
                )
            );
            setEditingDonorId(null);
        }
    };

    const handleAddAdmin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUsername || !newPassword) {
            alert("Username and password cannot be empty.");
            return;
        }
        if (adminUsers.some(user => user.username === newUsername)) {
            alert("Username already exists. Please choose a different one.");
            return;
        }
        const newUser: AdminUser = { username: newUsername, password: newPassword };
        setAdminUsers(prevAdmins => [...prevAdmins, newUser]);
        setNewUsername('');
        setNewPassword('');
        alert(`Admin user "${newUsername}" added successfully.`);
    };

    const handleDeleteAdmin = (usernameToDelete: string) => {
        if (adminUsers.length <= 1) {
            alert("You cannot delete the last admin user.");
            return;
        }
        if (window.confirm(`Are you sure you want to delete the admin user "${usernameToDelete}"?`)) {
            setAdminUsers(prevAdmins => prevAdmins.filter(user => user.username !== usernameToDelete));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                 <h1 className="text-3xl font-serif text-jcnc-blue">Admin Dashboard</h1>
                 <button 
                    onClick={onLogout} 
                    className="bg-jcnc-red text-white py-2 px-5 rounded-full font-bold cursor-pointer shadow-lg transition-transform duration-150 ease-in-out hover:-translate-y-0.5 hover:brightness-105"
                 >
                    Logout
                 </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <input 
                    type="file"
                    ref={editFileInputRef}
                    onChange={handleEditImageUpload}
                    className="hidden"
                    accept="image/*"
                />

                <div className="bg-white rounded-2xl shadow-lg p-7">
                    <h2 className="mt-0 font-serif text-jcnc-blue text-2xl">Update Campaign Progress</h2>
                    <form onSubmit={handleUpdateProgress} className="space-y-4 mt-4">
                        {/* Form content remains the same */}
                        <div>
                            <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Campaign Goal</label>
                            <input
                                type="number"
                                id="goal"
                                value={progress.goal}
                                onChange={(e) => setProgress(p => ({ ...p, goal: Number(e.target.value) }))}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-jcnc-gold focus:border-jcnc-gold sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="raised" className="block text-sm font-medium text-gray-700">Amount Raised</label>
                            <input
                                type="number"
                                id="raised"
                                value={raisedAmount}
                                onChange={(e) => setRaisedAmount(Number(e.target.value))}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-jcnc-gold focus:border-jcnc-gold sm:text-sm"
                            />
                        </div>
                        <button type="submit" className="bg-jcnc-blue text-white py-2 px-4 rounded-md hover:bg-opacity-90">
                            Update Progress
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-7">
                    <h2 className="mt-0 font-serif text-jcnc-blue text-2xl">Add New Donor</h2>
                    <form onSubmit={handleAddDonor} className="space-y-4 mt-4">
                        {/* Form content remains the same */}
                         <div>
                            <label htmlFor="donorName" className="block text-sm font-medium text-gray-700">Donor Name</label>
                            <input
                                type="text"
                                id="donorName"
                                value={donorName}
                                onChange={(e) => setDonorName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-jcnc-gold focus:border-jcnc-gold sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="labhType" className="block text-sm font-medium text-gray-700">Labh Type</label>
                             <input
                                type="text"
                                id="labhType"
                                value={labhType}
                                onChange={(e) => setLabhType(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-jcnc-gold focus:border-jcnc-gold sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="newDonorImage" className="block text-sm font-medium text-gray-700">Donor Image</label>
                            <input
                                type="file"
                                id="newDonorImage"
                                onChange={(e) => setNewDonorImage(e.target.files ? e.target.files[0] : null)}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-jcnc-blue/10 file:text-jcnc-blue hover:file:bg-jcnc-blue/20"
                                accept="image/*"
                            />
                        </div>
                         <div className="flex items-center">
                            <input
                                id="isMajor"
                                type="checkbox"
                                checked={isMajor}
                                onChange={(e) => setIsMajor(e.target.checked)}
                                className="h-4 w-4 text-jcnc-gold focus:ring-jcnc-gold border-gray-300 rounded"
                            />
                            <label htmlFor="isMajor" className="ml-2 block text-sm text-gray-900">
                                Major Donor
                            </label>
                        </div>
                        <button type="submit" className="bg-jcnc-red text-white py-2 px-4 rounded-md hover:bg-opacity-90">
                            Add Donor
                        </button>
                    </form>
                </div>
                
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-7">
                    <h2 className="mt-0 font-serif text-jcnc-blue text-2xl">Manage Donors</h2>
                     <div className="mt-4 max-h-96 overflow-y-auto">
                         <ul className="divide-y divide-gray-200">
                            {donors.map(donor => (
                                <li key={donor.id} className="py-3 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <img src={donor.imageUrl} alt={donor.name} className="h-12 w-12 rounded-full object-cover bg-gray-200" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{donor.name}</p>
                                            <p className="text-sm text-gray-500">{donor.labhType} ({donor.isMajor ? 'Major' : 'Tile'})</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 flex-shrink-0">
                                         <button onClick={() => handleChangeImageClick(donor.id)} className="text-jcnc-blue hover:underline text-sm font-medium">
                                            Change Image
                                        </button>
                                        <button onClick={() => handleDeleteDonor(donor.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                         </ul>
                    </div>
                </div>

                {/* Manage Admin Users */}
                 <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-7">
                    <h2 className="mt-0 font-serif text-jcnc-blue text-2xl">Manage Admin Users</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                        <div>
                            <h3 className="font-serif text-jcnc-blue text-xl">Add New Admin</h3>
                            <form onSubmit={handleAddAdmin} className="space-y-4 mt-2">
                                <div>
                                    <label htmlFor="newUsername" className="block text-sm font-medium text-gray-700">New Username</label>
                                    <input
                                        type="text"
                                        id="newUsername"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-jcnc-gold focus:border-jcnc-gold sm:text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-jcnc-gold focus:border-jcnc-gold sm:text-sm"
                                        required
                                    />
                                </div>
                                <button type="submit" className="bg-jcnc-blue text-white py-2 px-4 rounded-md hover:bg-opacity-90">
                                    Add Admin
                                </button>
                            </form>
                        </div>
                        <div>
                            <h3 className="font-serif text-jcnc-blue text-xl">Current Admins</h3>
                            <div className="mt-2 max-h-48 overflow-y-auto">
                                <ul className="divide-y divide-gray-200">
                                    {adminUsers.map(user => (
                                        <li key={user.username} className="py-2 flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-800">{user.username}</span>
                                            <button 
                                                onClick={() => handleDeleteAdmin(user.username)}
                                                className="text-red-600 hover:text-red-800 text-sm font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
                                                disabled={adminUsers.length <= 1}
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPortal;