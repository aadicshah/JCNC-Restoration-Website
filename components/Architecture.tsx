import React, { useState } from 'react';

const galleryImages = [
    { src: "https://restoration.jcnc.org/wp-content/uploads/2025/10/Screenshot-2025-10-11-at-4.37.28-PM.png", alt: "Ground Floor Rendering" },
    { src: "https://restoration.jcnc.org/wp-content/uploads/2025/10/Screenshot-2025-10-11-at-4.38.33-PM.png", alt: "3D Rendering" },
    { src: "https://restoration.jcnc.org/wp-content/uploads/2025/10/Screenshot-2025-10-11-at-4.37.54-PM.png", alt: "Rang Mandap Rendering" },
];

const timelineData = [
    { quarter: "Q2 '25 - Q3 '25", title: "General Contractor Award Down-selection", description: "Initial selection of qualified restoration contractors for JCNC Bhavan.", current: false },
    { quarter: "Q3 '25 - Q4 '25", title: "City Permit Process Starts", description: "Formal submissions and design reviews with the city of Milpitas.", current: true },
    { quarter: "Q4 '25 - Q1 '26", title: "City Permits Expected to Get Approved", description: "Final permit approval allowing JCNC to begin the restoration process.", current: false },
    { quarter: "Q1 '26 - Q3 '26", title: "Final Scope, Budget & Construction Contract Award", description: "All designs finalized and construction contracts awarded for implementation.", current: false },
    { quarter: "Q3 '26 - Q4 '26", title: "Restoration Complete", description: "The renewed JCNC Bhavan reopens for the community’s next generation of Seva and celebration.", current: false },
];

const Architecture: React.FC = () => {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const [focusedIndex, setFocusedIndex] = useState(timelineData.findIndex(item => item.current));

    return (
        <>
            <div className="bg-white rounded-2xl shadow-lg p-7">
                <h2 className="mt-0 font-serif text-jcnc-blue text-2xl">Architectural Vision</h2>
                <p className="text-lg text-jcnc-blue mt-2">
                    A glimpse of the restored Bhavan—maintaining the sanctity and authenticity of the <em>Shikharbandhi</em> temple while modernizing essential facilities.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                    {galleryImages.map((img, index) => (
                        <div key={index} onClick={() => setLightboxImage(img.src)} className="group rounded-xl overflow-hidden cursor-zoom-in aspect-4/3 bg-jcnc-blue/5 flex items-center justify-center" role="button" aria-label={`Open ${img.alt}`}>
                            <img 
                                src={img.src} 
                                alt={img.alt} 
                                className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
                <h3 className="mt-10 text-center text-jcnc-blue text-2xl font-serif">Project Timeline (Tentative)</h3>
                <p className="text-center text-muted mb-5">Click on a milestone to focus on the details.</p>

                {/* Interactive Timeline */}
                <div className="relative max-w-3xl mx-auto p-4">
                    <div className="absolute left-4 md:left-6 top-0 bottom-0 w-1 bg-jcnc-gold/50"></div>
                    {timelineData.map((item, index) => {
                        const isFocused = focusedIndex === index;
                        return (
                            <div 
                                key={index}
                                className="relative pl-12 md:pl-16 pb-12 last:pb-0 cursor-pointer group"
                                onClick={() => setFocusedIndex(index)}
                            >
                                <div className={`absolute left-4 md:left-6 top-1 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-jcnc-gold z-10 transition-all duration-300 ${isFocused ? 'bg-jcnc-gold border-jcnc-blue' : 'bg-jcnc-blue'}`}>
                                    {isFocused && (
                                        <div className="absolute -inset-1 rounded-full bg-jcnc-blue/20 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
                                    )}
                                </div>
                                <div className={`transition-all duration-300 ${isFocused ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                                    <p className={`font-extrabold text-lg transition-colors ${isFocused ? 'text-jcnc-blue' : 'text-jcnc-gold'}`}>
                                        {item.quarter}
                                    </p>
                                    <div className={`mt-2 bg-white rounded-xl p-5 transition-all duration-300 group-hover:-translate-y-1 ${isFocused ? 'shadow-2xl scale-[1.03]' : 'shadow-lg'}`}>
                                        <h4 className="font-bold text-jcnc-blue text-lg">{item.title}</h4>
                                        <p className="text-muted mt-1">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxImage && (
                <div onClick={() => setLightboxImage(null)} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-5 animate-[fadeIn_0.3s_ease-out]">
                    <img src={lightboxImage} alt="Enlarged view" className="max-w-full max-h-full rounded-xl shadow-2xl" />
                </div>
            )}
            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes pulse { 50% { opacity: 0.5; } }
            `}</style>
        </>
    );
};

export default Architecture;