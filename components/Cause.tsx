
import React, { useState, useEffect, useRef } from 'react';
import type { CampaignProgress } from '../types';

interface CauseProps {
    progress: CampaignProgress;
}

const numFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });

const Cause: React.FC<CauseProps> = ({ progress }) => {
    const { goal, raised } = progress;
    const remaining = goal - raised;
    const percentage = goal > 0 ? (raised / goal) * 100 : 0;
    
    const progressRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                observer.disconnect();
            }
        }, { threshold: 0.4 });

        if (progressRef.current) {
            observer.observe(progressRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-7 border-t-8 border-jcnc-gold text-center">
                <h2 className="m-0 mb-2 text-2xl text-jcnc-red font-serif">Live Campaign Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
                    <Figure label="Goal by March 2026" value={goal} inView={inView} />
                    <Figure label="Raised" value={raised} inView={inView} isRaised />
                    <Figure label="Remaining" value={remaining} inView={inView} />
                </div>
                <div ref={progressRef} className="bg-gray-200 rounded-full h-5 overflow-hidden shadow-inner">
                    <div
                        className="bg-gradient-to-r from-jcnc-gold to-jcnc-gold-2 h-full text-[#3b2d09] font-bold flex items-center justify-end pr-2.5 text-xs transition-all duration-[1500ms] ease-in-out"
                        style={{ width: inView ? `${percentage}%` : '0%' }}
                    >
                        <span className="pr-2.5">{percentage.toFixed(1)}% Complete</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-7">
                <h2 className="font-serif text-jcnc-blue text-2xl">The Cause: Maintaining Our Iconic Jain Bhavan</h2>
                <hr className="h-0.5 bg-gradient-to-r from-jcnc-gold to-transparent border-0 my-4" />
                <p className="text-lg text-jcnc-blue">
                    Within these walls, generations have gathered for <strong>prayer, festivals, pathshala, and sadharmik bhakti</strong>.
                    As our Sangh grows, so do our needs: expanded restrooms and facilities, an upgraded kitchen and dining hall,
                    and essential modernization for safety and accessibility.
                </p>
                <p className="text-lg text-jcnc-blue mt-4">
                    This project is not just repair—it is <strong><em>Jirnodhar</em></strong>: a sacred renewal that preserves sanctity while enabling
                    the next 25 years of seva and learning.
                </p>
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl font-semibold mt-6">Join the Jirnodhar effort and leave a lasting family legacy through Labh opportunities.</div>
            </div>
        </div>
    );
};

interface FigureProps {
    label: string;
    value: number;
    inView: boolean;
    isRaised?: boolean;
}

const AnimatedCounter: React.FC<{ target: number; inView: boolean }> = ({ target, inView }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        
        let start = 0;
        const duration = 1200;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(1, elapsedTime / duration);
            const currentVal = Math.floor(progress * target);
            setCount(currentVal);
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };
        requestAnimationFrame(animate);

    }, [target, inView]);

    return <span>{numFmt.format(count)}</span>;
};

const Figure: React.FC<FigureProps> = ({ label, value, inView, isRaised }) => (
    <div className="p-4 rounded-xl bg-gradient-to-b from-gray-50 to-gray-200 border border-gray-200">
        <div className="text-xs tracking-[.18em] uppercase text-muted">{label}</div>
        <div className={`text-2xl lg:text-3xl font-extrabold ${isRaised ? 'text-jcnc-red' : 'text-jcnc-blue'}`}>
            <AnimatedCounter target={value} inView={inView} />
        </div>
    </div>
);

export default Cause;
