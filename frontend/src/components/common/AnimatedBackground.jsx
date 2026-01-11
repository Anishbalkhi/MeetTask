import React from 'react';

const AnimatedBackground = () => {
    return (
        <>
            {/* Animated Background Orbs */}
            <div className="bg-orbs-container">
                <div className="bg-orb bg-orb-1"></div>
                <div className="bg-orb bg-orb-2"></div>
                <div className="bg-orb bg-orb-3"></div>
                <div className="bg-orb bg-orb-4"></div>
            </div>

            {/* Additional Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Floating circles */}
                <div className="floating-shape circle-1"></div>
                <div className="floating-shape circle-2"></div>
                <div className="floating-shape circle-3"></div>

                {/* Floating squares */}
                <div className="floating-square square-1"></div>
                <div className="floating-square square-2"></div>

                {/* Grid pattern overlay */}
                <div className="grid-pattern"></div>

                {/* Animated gradient mesh */}
                <div className="gradient-mesh"></div>

                {/* Scanning line */}
                <div className="scan-line"></div>
            </div>
        </>
    );
};

export default AnimatedBackground;
