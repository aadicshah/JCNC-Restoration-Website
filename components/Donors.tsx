import React from 'react';
import type { Donor } from '../types';

interface DonorsProps {
    donors: Donor[];
}

const Donors: React.FC<DonorsProps> = ({ donors }) => {
    // Sort donors alphabetically by name
    const sortedDonors = [...donors].sort((a, b) => a.name.localeCompare(b.name));

    const majorDonors = sortedDonors.filter(d => d.isMajor);
    const tileSponsors = sortedDonors.filter(d => !d.isMajor);

    // Create a duplicated list for a seamless ticker loop
    const tickerDonors = majorDonors.length > 0 ? [...majorDonors, ...majorDonors] : [];

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-7">
                <h2 className="mt-0 font-serif text-jcnc-blue text-2xl">Our Esteemed Donors (Anumodna)</h2>
                <p className="text-muted mt-1.5">
                    We offer our deepest gratitude to the families and individuals who have pledged their support.
                </p>
                <div className="relative overflow-hidden rounded-xl bg-jcnc-blue mt-4 group">
                     <div className="absolute top-0 bottom-0 left-0 w-20 z-[2] bg-gradient-to-r from-jcnc-blue to-transparent"></div>
                    <div className="absolute top-0 bottom-0 right-0 w-20 z-[2] bg-gradient-to-l from-jcnc-blue to-transparent"></div>
                    <div className="flex gap-6 p-3 animate-[marquee_25s_linear_infinite] group-hover:[animation-play-state:paused]">
                        {tickerDonors.map((donor, index) => (
                            <span key={`${donor.id}-${index}`} className="flex-shrink-0 bg-gradient-to-r from-yellow-600 to-yellow-400 text-yellow-900 border-yellow-400 border py-2.5 px-4 rounded-full font-semibold shadow-inner">
                                {donor.labhType}: {donor.name}
                            </span>
                        ))}
                    </div>
                </div>
                 <p className="text-center mt-4 italic text-muted">
                    A full list across all tiers will be updated regularly on this page.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-7">
                <h2 className="mt-0 font-serif text-jcnc-blue text-2xl">Major Donors</h2>
                <p className="text-muted mt-1.5">Click a donor card to reveal the family photo.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 justify-items-center">
                    {majorDonors.map(donor => <DonorCard key={donor.id} donor={donor} />)}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-7">
                <h2 className="mt-0 font-serif text-jcnc-blue text-2xl">Tile Sponsors</h2>
                <p className="text-muted mt-1.5">Smaller but equally impactful contributions forming the foundation of our Bhavan’s future.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 mt-6 justify-items-center">
                    {tileSponsors.map(donor => <DonorCard key={donor.id} donor={donor} small />)}
                </div>
            </div>
        </div>
    );
};

interface DonorCardProps {
    donor: Donor;
    small?: boolean;
}

const DonorCard: React.FC<DonorCardProps> = ({ donor, small }) => {
    return (
        <div className="group [perspective:1000px] w-full max-w-xs">
            <div className={`relative w-full aspect-square [transform-style:preserve-3d] transition-transform duration-700 group-hover:rotate-y-180 cursor-pointer`}>
                {/* Front side of the card */}
                <div className="absolute inset-0 rounded-2xl shadow-lg bg-gradient-to-b from-white to-gray-100 border border-gray-200 flex flex-col justify-center items-center text-center p-4 [backface-visibility:hidden]">
                    <h3 className={`font-bold text-jcnc-blue ${small ? 'text-base' : 'text-lg'}`}>{donor.name}</h3>
                    <p className={`text-jcnc-gold font-medium ${small ? 'text-xs mt-1' : 'text-sm mt-2'}`}>{donor.labhType}</p>
                </div>
                {/* Back side of the card */}
                <div className="absolute inset-0 rounded-2xl shadow-lg bg-black [transform:rotateY(180deg)] [backface-visibility:hidden] grid place-items-center overflow-hidden">
                    {donor.imageUrl ? (
                        <img src={donor.imageUrl} alt={`Photo of ${donor.name}`} className="w-full h-full object-cover" />
                    ): (
                        <div className="text-white">No Image</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Donors;