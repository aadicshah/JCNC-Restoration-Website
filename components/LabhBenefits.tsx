import React from 'react';
import { LABH_BENEFITS_DATA } from '../constants';

const LabhBenefits: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-7">
            <h2 className="mt-0 font-serif text-jcnc-blue text-2xl">Benefits of Each Labh</h2>
            <p className="mt-2 text-muted mb-5">
                Each Labh offers unique spiritual, community, and recognition opportunities to honor your family’s contribution.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LABH_BENEFITS_DATA.map((tier, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
                        <h3 className="font-serif text-lg text-jcnc-blue">{tier.name}</h3>
                        <p className="font-semibold text-jcnc-gold text-lg mb-3">{tier.amount}</p>
                        <ul className="space-y-2 text-sm text-muted list-disc pl-5">
                            {tier.benefits.map((benefit, i) => (
                                <li key={i}>{benefit}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LabhBenefits;
