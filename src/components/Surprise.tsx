import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AudioPlayer from './AudioPlayer';

interface SurpriseProps {
    onReveal: () => void;
}

const Surprise: React.FC<SurpriseProps> = ({ onReveal }) => {
    const [showMessage, setShowMessage] = useState(false);
    const [showInitialContent, setShowInitialContent] = useState(true);
    const [showCountdown, setShowCountdown] = useState(false);
    const [playClick, setPlayClick] = useState(false);
    const [playSurprise, setPlaySurprise] = useState(false);
    const [playCelebration, setPlayCelebration] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(false);

    useEffect(() => {
        const audio = new Audio();
        setAudioEnabled(!!audio.canPlayType);
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showCountdown) {
            timer = setTimeout(() => {
                setShowCountdown(false);
                setShowMessage(true);
                if (audioEnabled) {
                    setPlaySurprise(true);
                    setTimeout(() => {
                        setPlayCelebration(true);
                    }, 1000);
                }
                setTimeout(() => {
                    onReveal();
                }, 4000);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [showCountdown, audioEnabled, onReveal]);

    const handleClick = () => {
        if (audioEnabled) {
            setPlayClick(true);
        }
        setShowInitialContent(false);
        setShowCountdown(true);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-primary to-neutral p-4">
            {audioEnabled && (
                <>
                    <AudioPlayer type="click" play={playClick} />
                    <AudioPlayer type="surprise" play={playSurprise} />
                    <AudioPlayer type="celebration" play={playCelebration} />
                </>
            )}

            <AnimatePresence mode="wait">
                {showInitialContent ? (
                    <motion.div
                        key="initial"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                            Hey JANE! 👋
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-750 mb-12 leading-relaxed">
                            I know I have a habit of popping in and out like a surprise guest on a reality show 😅. I could list a dozen excuses, but the truth is, we're all on our own journeys, and I'm just trying to find my path 🤧.

                            I hope you're crafting your journey into something amazing—living life to the fullest 🤩, exploring new horizons 🔍, and having a blast 🎉. Of course, there are bumps along the way and moments that feel overwhelming, but I believe everything gets better with time. And I know you're strong enough to handle it all 💪🏻.

                            But hey, if ever you feel like the weight is too much, just remember there's a guy, miles away, who genuinely cares about you and is cheering you on from afar 🤗.
                        </p>
                        <h3 className="text-xl md:text-3xl text-gray-700 mb-12">
                            I have something special for you...
                        </h3>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleClick}
                            className="px-8 py-4 bg-white text-gray-900 rounded-lg shadow-lg hover:shadow-xl 
                           text-xl font-semibold transform transition-all duration-300"
                        >
                            Click to Reveal
                        </motion.button>
                    </motion.div>
                ) : showCountdown ? (
                    <motion.div
                        key="countdown"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center gap-4">
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl md:text-4xl text-gray-900"
                            >
                                YOU THAUGHT THAT I FORGET
                            </motion.p>
                            <motion.img
                                src="/icons8-batman-emoji-60.png"
                                alt="Batman emoji"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15,
                                    delay: 0.5
                                }}
                                className="w-12 h-12"
                            />
                        </div>
                    </motion.div>
                ) : showMessage ? (
                    <motion.div
                        key="surprise"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 10,
                            duration: 1
                        }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                delay: 0.5
                            }}
                            className="text-5xl md:text-7xl font-bold text-gray-900 mb-8"
                        >
                            🎉 SURPRISE! 🎉
                        </motion.div>
                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="text-3xl md:text-4xl text-gray-700 mb-4"
                        >
                            Happy Birthday, Jane! 🎂
                        </motion.p>
                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                            className="text-2xl md:text-3xl text-gray-600"
                        >
                            Let's celebrate your special day! 🎈
                        </motion.p>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                delay: 2
                            }}
                            className="mt-8 text-4xl"
                        >
                            🎁 🎈 🎂 🎊
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
};

export default Surprise; 