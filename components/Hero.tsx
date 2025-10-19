
import React from 'react';

interface HeroProps {
    onPledgeNow: () => void;
    onLearnMore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onPledgeNow, onLearnMore }) => {
    return (
        <header className="relative overflow-clip text-white min-h-[62vh] grid place-items-center bg-gradient-to-br from-[rgba(10,54,72,.92)] to-[rgba(10,54,72,.76)]" aria-label="JCNC Bhavan Restoration">
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_90%_-10%,rgba(200,153,50,.35),transparent_60%)]"></div>
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_-120px_120px_-40px_rgba(10,54,72,.55)]"></div>
            
            <div className="relative container mx-auto text-center px-4 py-20 z-10">
                <img
                    src="https://restoration.jcnc.org/wp-content/uploads/2025/10/Untitled-449-x-100-px-4.png"
                    alt="JCNC Logo"
                    className="absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-auto object-contain filter brightness-110 drop-shadow-lg transition-transform duration-200 ease-in-out cursor-pointer"
                />

                <div className="uppercase tracking-[.25em] opacity-90 font-semibold">JCNC Bhavan Restoration (Jirnodhar)</div>
                <h1 className="my-4 font-semibold text-3xl md:text-4xl lg:text-5xl text-jcnc-gold-2 font-serif">Preserving Our Iconic Legacy for Future Generations</h1>
                <p className="my-2 mx-auto max-w-4xl text-sm md:text-lg text-[#eef5f9]">
                    For 25+ years, JCNC has united our community in devotion, learning, and celebration—the first
                    Jain temple bringing together all five traditions. With your blessings, we will modernize our
                    facilities while honoring the sacred <em>Shikharbandhi</em> heritage.
                </p>
                <div className="flex gap-4 justify-center flex-wrap mt-6">
                    <button onClick={onPledgeNow} className="bg-gradient-to-r from-jcnc-gold to-jcnc-gold-2 text-[#3b2d09] border-none py-3 px-5 rounded-full font-bold cursor-pointer shadow-lg transition-transform duration-150 ease-in-out hover:-translate-y-0.5 hover:brightness-105">Pledge Now</button>
                    <button onClick={onLearnMore} className="bg-[rgba(255,255,255,.14)] text-white backdrop-blur-sm border border-[rgba(255,255,255,.35)] py-3 px-5 rounded-full font-bold cursor-pointer shadow-lg transition-transform duration-150 ease-in-out hover:-translate-y-0.5 hover:brightness-105">Learn More</button>
                </div>
            </div>
        </header>
    );
};

export default Hero;
