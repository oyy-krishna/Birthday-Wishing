"use client";

// src/components/Messages.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: number;
    title: string;
    content: string;
    emoji: string;
    author: string;
    giftEmoji: string;
    wrappingColor: string;
}

const messages: Message[] = [
    {
        id: 1,
        title: "To That Amazing Girl",
        content: "Jane, you're one of the most incredible people I've ever met. Your strength, kindness, and beautiful soul inspire everyone around you. No matter what life throws at you, remember that you have the power to overcome anything. I believe in you, always.",
        emoji: "💫",
        author: "A Grateful Friend",
        giftEmoji: "🎁",
        wrappingColor: "from-pink-400 to-purple-500"
    },
    {
        id: 2,
        title: "Our Journey",
        content: "Our journy begins on That Boo App where i was killing my time and then something suddenly caught my attention and i can't able to resist myself from asking what kind of drink that is, because i thaught it looks like mocktail but the quantity is too much for a single person to handle and after then you replied that it's the megical portion then my criosity raised even heigher but after few moments you said it's just the cup of jellies and i was like 😓 man... why i'm so silly......... \n 😂 I still remember that BOO app said that we were not the perfect matchs for each other but still we continued......\n THANKS JANE FOR GIVING ME THAT OPPORTUNITY",
        emoji: "🌟",
        author: "A Grateful Friend",
        giftEmoji: "🎀",
        wrappingColor: "from-blue-400 to-teal-500"
    },
    {
        id: 3,
        title: "Special Moments",
        content: "Even though we never met in person, we shared some special moments and we were like connected through souls.... your kindfull behaviour is what attracts me the most and top of the cherry is your teasing nature which keeps the things more real and enjoyable ",
        emoji: "😊",
        author: "A Grateful Friend",
        giftEmoji: "🎊",
        wrappingColor: "from-yellow-400 to-orange-500"
    },
    {
        id: 4,
        title: "Your Supportiveness",
        content: "What I admire most about you is how you're always there for others, even when you're going through your own challenges. You have this incredible ability to make people feel understood and valued. Your support isn't just words—it's your actions, your patience, and your genuine care that make such a difference in people's lives.",
        emoji: "🤗",
        author: "A Grateful Friend",
        giftEmoji: "🎈",
        wrappingColor: "from-green-400 to-emerald-500"
    },
    {
        id: 5,
        title: "Your Mind & Soul",
        content: "Your ability to engage in deep, meaningful conversations is truly remarkable. You have this unique way of making people think differently about life, relationships, and personal growth. Your mindfulness and self-awareness are inspiring, and the way you approach life's challenges with wisdom and grace is something I deeply admire.",
        emoji: "💭",
        author: "Someone Who Appreciates You",
        giftEmoji: "✨",
        wrappingColor: "from-red-400 to-rose-500"
    }
];

export default function Messages() {
    const [currentMessage, setCurrentMessage] = useState(0);
    const [isUnwrapping, setIsUnwrapping] = useState(false);
    const [unwrappedGifts, setUnwrappedGifts] = useState<number[]>([]);

    const handleUnwrap = () => {
        setIsUnwrapping(true);
        setTimeout(() => {
            setUnwrappedGifts([...unwrappedGifts, currentMessage]);
            setIsUnwrapping(false);
        }, 1000);
    };

    const nextGift = () => {
        if (currentMessage < messages.length - 1) {
            setCurrentMessage(prev => prev + 1);
        }
    };

    const prevGift = () => {
        if (currentMessage > 0) {
            setCurrentMessage(prev => prev - 1);
        }
    };

    const isCurrentGiftUnwrapped = unwrappedGifts.includes(currentMessage);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary to-neutral">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
            >
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Birthday presents 🎁
                </h1>
                <p className="text-base md:text-xl text-white/90">
                    Click each gift to unwrap a special message!
                </p>
            </motion.div>

            <div className="relative w-full max-w-2xl px-4 md:px-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentMessage}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        {!isCurrentGiftUnwrapped ? (
                            <motion.div
                                className={`bg-gradient-to-br ${messages[currentMessage].wrappingColor} rounded-2xl shadow-2xl p-8 md:p-12 
                                          cursor-pointer transform transition-all duration-300 hover:scale-105`}
                                onClick={handleUnwrap}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    animate={isUnwrapping ? {
                                        rotate: [0, 15, -15, 0],
                                        scale: [1, 1.2, 0.8, 1],
                                    } : {}}
                                    transition={{ duration: 0.5 }}
                                    className="text-center"
                                >
                                    <div className="text-6xl md:text-8xl mb-4">
                                        {messages[currentMessage].giftEmoji}
                                    </div>
                                    <p className="text-white text-xl md:text-2xl font-semibold">
                                        Tap to Unwrap!
                                    </p>
                                </motion.div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
                            >
                                <div className="text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-4xl md:text-6xl mb-6"
                                    >
                                        {messages[currentMessage].emoji}
                                    </motion.div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                        {messages[currentMessage].title}
                                    </h2>
                                    <p className="text-base md:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
                                        {messages[currentMessage].content}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                    <button
                        onClick={prevGift}
                        disabled={currentMessage === 0}
                        className={`pointer-events-auto p-2 md:p-3 rounded-full bg-white/80 hover:bg-white 
                                  transform transition-all duration-300 ${currentMessage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextGift}
                        disabled={currentMessage === messages.length - 1}
                        className={`pointer-events-auto p-2 md:p-3 rounded-full bg-white/80 hover:bg-white 
                                  transform transition-all duration-300 ${currentMessage === messages.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center text-white/80"
            >
                <p className="text-sm md:text-lg">
                    Gift {currentMessage + 1} of {messages.length}
                </p>
            </motion.div>
        </div>
    );
}
