
import React from 'react';
import { FAQ_DATA } from '../constants';

const Faq: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-7">
            <h2 className="mt-0 font-serif text-jcnc-blue text-2xl">Frequently Asked Questions (FAQ)</h2>
            <p className="text-muted mb-5">
                Find answers to common questions about the JCNC Bhavan Restoration (Jirnodhar) Project.
                If you don’t see your question here, please reach out at
                <a href="mailto:fundraising@jcnc.org" className="text-jcnc-blue font-semibold"> fundraising@jcnc.org</a>.
            </p>
            <div className="flex flex-col gap-3.5">
                {FAQ_DATA.map(({ q, a }, index) => (
                    <details key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 transition-all duration-300 open:bg-yellow-50 open:border-jcnc-gold group">
                        <summary className="font-semibold text-jcnc-blue cursor-pointer list-none relative pr-6">
                            {q}
                            <span className="absolute right-0 top-0 text-xl text-jcnc-gold transition-transform duration-300 group-open:rotate-180 group-open:content-['–']">
                                +
                            </span>
                        </summary>
                        <p className="mt-2.5 text-muted leading-relaxed">
                            {a}
                        </p>
                    </details>
                ))}
            </div>
        </div>
    );
};

export default Faq;
