import React from 'react';
import type { LabhTier } from '../types';

interface LabhsProps {
    labhTiers: LabhTier[];
    onPledgeNow: () => void;
    onViewBenefits: () => void;
}

const Labhs: React.FC<LabhsProps> = ({ labhTiers, onPledgeNow, onViewBenefits }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-7">
            <h2 className="mt-0 font-serif text-jcnc-blue text-2xl">Sponsor a Labh: Restoration Tiers</h2>
            <p className="mt-2 text-muted">An auspicious act (<em>Punya</em>) with permanent recognition in our sacred Bhavan.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
                {labhTiers.map(tier => <FlipCard key={tier.name} tier={tier} onPledgeNow={onPledgeNow} onViewBenefits={onViewBenefits} />)}
            </div>
        </div>
    );
};

interface FlipCardProps {
    tier: LabhTier;
    onPledgeNow: () => void;
    onViewBenefits: () => void;
}

const FlipCard: React.FC<FlipCardProps> = ({ tier, onPledgeNow, onViewBenefits }) => {
    return (
        <div className="group [perspective:1000px]">
            <div className="relative w-full h-64 [transform-style:preserve-3d] transition-transform duration-700 group-hover:rotate-y-180">
                {/* Front */}
                <div className="absolute inset-0 rounded-2xl shadow-lg bg-gradient-to-b from-white to-gray-100 border border-gray-200 flex flex-col items-center justify-center p-5 [backface-visibility:hidden]">
                    {tier.icon}
                    <div className="text-base font-bold text-jcnc-blue text-center">{tier.name}</div>
                    <h3 className="text-xl font-serif font-bold text-jcnc-blue my-1">{tier.amount}</h3>
                    <div className="flex flex-col items-center gap-1 mt-1">
                        {tier.tags.map(tag => (
                            <span key={tag} className="bg-jcnc-gold/10 text-jcnc-gold border border-jcnc-gold/30 text-xs px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                    </div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 rounded-2xl shadow-lg bg-gradient-to-b from-jcnc-blue to-[#0c2735] text-white [transform:rotateY(180deg)] [backface-visibility:hidden] p-5 flex flex-col items-center justify-center text-center space-y-3">
                    <h3 className="font-serif text-lg text-jcnc-gold-2">{tier.name}</h3>
                     <button onClick={onViewBenefits} className="text-sm bg-white/10 border border-white/30 backdrop-blur-sm text-white py-1.5 px-4 rounded-full font-semibold cursor-pointer transition-colors hover:bg-white/20">
                        View Benefits
                    </button>
                    <p className="text-sm leading-snug">{tier.description}</p>
                    <button onClick={onPledgeNow} className="bg-gradient-to-r from-jcnc-gold to-jcnc-gold-2 text-[#3b2d09] border-none py-2 px-4 rounded-full font-bold cursor-pointer shadow-lg transition-transform duration-150 ease-in-out hover:-translate-y-0.5 hover:brightness-110">
                        Pledge Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Labhs;