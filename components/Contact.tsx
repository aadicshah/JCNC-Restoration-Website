
import React, { useState } from 'react';

const Contact: React.FC<{ onPledgeNow: () => void }> = ({ onPledgeNow }) => {
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/mldpoovq", {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                setStatus('success');
                setMessage('Thank you! Your message has been sent successfully.');
                form.reset();
            } else {
                setStatus('error');
                setMessage('There was an issue sending your message. Please try again later.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Network error. Please try again.');
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-7">
            <h2 className="mt-0 font-serif text-jcnc-blue text-2xl">Contact Us</h2>
            <p className="text-lg text-jcnc-blue mt-3">
                For any inquiries or to get involved in supporting the JCNC Bhavan Restoration (Jirnodhar) campaign, please reach out to the appropriate team:
            </p>
            <ul className="list-none p-0 mt-2 space-y-2 text-jcnc-blue font-semibold">
                <li>• Fundraising Questions: <a href="mailto:fundraising@jcnc.org" className="text-jcnc-blue font-semibold hover:underline">fundraising@jcnc.org</a></li>
                <li>• Construction & Project Questions: <a href="mailto:construction@jcnc.org" className="text-jcnc-blue font-semibold hover:underline">construction@jcnc.org</a></li>
            </ul>
            <p className="mt-3 text-muted">
                We welcome questions about pledges, Labh opportunities, or project updates. Our team will respond promptly.
            </p>

            <form onSubmit={handleSubmit} className="max-w-2xl mt-5 space-y-4">
                <h3 className="font-serif text-xl text-jcnc-blue">Send a Message</h3>
                <div className="relative">
                    <input className="peer w-full p-3.5 border rounded-xl border-gray-300 bg-gray-50 outline-none transition-all focus:border-jcnc-gold focus:shadow-[0_0_0_4px_rgba(200,153,50,.2)] placeholder-transparent" type="text" id="c_name" name="name" placeholder="Name" required />
                    <label className="absolute left-3 -top-2.5 px-1.5 bg-gray-50 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-jcnc-blue peer-focus:text-sm" htmlFor="c_name">Name</label>
                </div>
                 <div className="relative">
                    <input className="peer w-full p-3.5 border rounded-xl border-gray-300 bg-gray-50 outline-none transition-all focus:border-jcnc-gold focus:shadow-[0_0_0_4px_rgba(200,153,50,.2)] placeholder-transparent" type="email" id="c_email" name="email" placeholder="Email" required />
                    <label className="absolute left-3 -top-2.5 px-1.5 bg-gray-50 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-jcnc-blue peer-focus:text-sm" htmlFor="c_email">Email</label>
                </div>
                 <div className="relative">
                    <textarea className="peer w-full p-3.5 min-h-28 resize-y border rounded-xl border-gray-300 bg-gray-50 outline-none transition-all focus:border-jcnc-gold focus:shadow-[0_0_0_4px_rgba(200,153,50,.2)] placeholder-transparent" id="c_message" name="message" placeholder="Message" required></textarea>
                    <label className="absolute left-3 -top-2.5 px-1.5 bg-gray-50 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-jcnc-blue peer-focus:text-sm" htmlFor="c_message">Message</label>
                </div>
                <div className="flex gap-3 items-center">
                     <button type="submit" className="bg-jcnc-blue text-white py-3 px-5 rounded-full font-bold cursor-pointer shadow-lg transition-transform duration-150 ease-in-out hover:-translate-y-0.5 hover:brightness-105">Send Message</button>
                     <button type="button" onClick={onPledgeNow} className="bg-gradient-to-r from-jcnc-gold to-jcnc-gold-2 text-[#3b2d09] border-none py-3 px-5 rounded-full font-bold cursor-pointer shadow-lg transition-transform duration-150 ease-in-out hover:-translate-y-0.5 hover:brightness-105">Pledge Now</button>
                </div>
                {status !== 'idle' && (
                    <div className={`p-3 rounded-lg text-center font-semibold ${status === 'success' ? 'bg-green-100 border border-green-300 text-green-800' : 'bg-red-100 border border-red-300 text-red-800'}`}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Contact;
