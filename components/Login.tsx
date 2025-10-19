import React, { useState } from 'react';

interface LoginProps {
    onLogin: (username: string, password: string) => void;
    error: string | null;
}

const Login: React.FC<LoginProps> = ({ onLogin, error }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
            <h2 className="mt-0 font-serif text-jcnc-blue text-2xl text-center">Admin Login</h2>
            <p className="text-muted text-center mb-6">Please enter your credentials to access the portal.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full border border-gray-300 rounded-lg p-3 text-base bg-gray-50 outline-none transition-all duration-200 focus:border-jcnc-gold focus:shadow-[0_0_0_3px_rgba(200,153,50,0.25)]"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full border border-gray-300 rounded-lg p-3 text-base bg-gray-50 outline-none transition-all duration-200 focus:border-jcnc-gold focus:shadow-[0_0_0_3px_rgba(200,153,50,0.25)]"
                        required
                    />
                </div>
                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg text-center font-semibold">
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-jcnc-blue text-white py-3 px-5 rounded-full font-bold cursor-pointer shadow-lg transition-transform duration-150 ease-in-out hover:-translate-y-0.5 hover:brightness-105"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;