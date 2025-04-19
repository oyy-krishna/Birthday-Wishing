"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Webcam from 'react-webcam';

interface Filter {
    name: string;
    style: React.CSSProperties;
    emoji: string;
    description: string;
}

const filters: Filter[] = [
    { 
        name: 'Silly Face', 
        style: { 
            filter: 'contrast(1.2) saturate(1.5)',
            transform: 'scaleX(-1)'
        }, 
        emoji: '🤪',
        description: 'Mirror, mirror on the wall...'
    },
    { 
        name: 'Time Travel', 
        style: { 
            filter: 'sepia(0.8) contrast(1.2)',
            transform: 'rotate(-5deg)'
        }, 
        emoji: '⏳',
        description: 'Back to the future!'
    },
    { 
        name: 'Rainbow Magic', 
        style: { 
            filter: 'hue-rotate(90deg) saturate(1.5)',
            transform: 'scale(1.1)'
        }, 
        emoji: '🌈',
        description: 'Unicorn mode activated!'
    },
    { 
        name: 'Glow Up', 
        style: { 
            filter: 'brightness(1.2) contrast(1.2)',
            transform: 'scale(1.05)'
        }, 
        emoji: '✨',
        description: 'Shine bright like a diamond!'
    },
    { 
        name: 'Noir', 
        style: { 
            filter: 'grayscale(100%)',
            transform: 'rotate(2deg)'
        }, 
        emoji: '🎬',
        description: 'Lights, camera, drama!'
    },
    { 
        name: 'Upside Down', 
        style: { 
            filter: 'invert(100%)',
            transform: 'rotate(180deg)'
        }, 
        emoji: '🔄',
        description: 'Everything is opposite day!'
    },
    { 
        name: 'Pop Art', 
        style: { 
            filter: 'contrast(1.5) saturate(2)',
            transform: 'scale(1.1) rotate(-3deg)'
        }, 
        emoji: '🎨',
        description: 'Warhol would be proud!'
    },
    { 
        name: 'Dreamy', 
        style: { 
            filter: 'blur(1px) brightness(1.1)',
            transform: 'scale(1.05)'
        }, 
        emoji: '💭',
        description: 'Sweet dreams are made of this!'
    }
];

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

export default function PhotoFun() {
    const [photo, setPhoto] = useState<string | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [showFunMessage, setShowFunMessage] = useState(false);
    const webcamRef = useRef<Webcam>(null);

    const startCamera = () => {
        setIsCameraActive(true);
    };

    const stopCamera = () => {
        setIsCameraActive(false);
    };

    const capturePhoto = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                setPhoto(imageSrc);
                stopCamera();
                setShowFunMessage(true);
                setTimeout(() => setShowFunMessage(false), 3000);
            }
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setPhoto(event.target.result as string);
                    setShowFunMessage(true);
                    setTimeout(() => setShowFunMessage(false), 3000);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const applyFilter = (filter: Filter) => {
        setSelectedFilter(filter);
    };

    const savePhoto = () => {
        if (photo) {
            const link = document.createElement('a');
            link.download = 'fun-photo.png';
            link.href = photo;
            link.click();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary to-neutral">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                    Let's Get Silly! 📸
                </h1>
                <p className="text-xl text-black/80">
                    Time to make some fun memories! Take a photo or upload one, then let's get creative!
                </p>
            </motion.div>

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6">
                {!photo && !isCameraActive && (
                    <div className="flex flex-col items-center gap-4">
                        <button
                            onClick={startCamera}
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors
                                   transform hover:scale-105 active:scale-95"
                        >
                            Open Camera 📷
                        </button>
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="photo-upload"
                            />
                            <label
                                htmlFor="photo-upload"
                                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 
                                       transition-colors cursor-pointer transform hover:scale-105 active:scale-95"
                            >
                                Upload Photo 📤
                            </label>
                        </div>
                    </div>
                )}

                {isCameraActive && (
                    <div className="relative w-full h-[400px]">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                            mirrored={true}
                        />
                        <button
                            onClick={capturePhoto}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-gray-900 
                                   rounded-lg shadow-lg hover:bg-gray-100 transition-colors transform hover:scale-105 
                                   active:scale-95"
                        >
                            Say Cheese! 📸
                        </button>
                    </div>
                )}

                {photo && (
                    <div className="space-y-6">
                        <div className="relative">
                            <motion.img
                                src={photo}
                                alt="Captured"
                                className="w-full rounded-lg"
                                style={selectedFilter?.style}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                            {showFunMessage && (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 text-gray-900 
                                             px-4 py-2 rounded-lg shadow-lg"
                                >
                                    Looking good! 😍
                                </motion.div>
                            )}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2">
                                {filters.map((filter) => (
                                    <motion.button
                                        key={filter.name}
                                        onClick={() => applyFilter(filter)}
                                        className={`px-3 py-1 rounded-lg ${
                                            selectedFilter?.name === filter.name
                                                ? 'bg-primary text-white'
                                                : 'bg-white/80 text-gray-900'
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {filter.emoji} {filter.name}
                                    </motion.button>
                                ))}
                            </div>
                            {selectedFilter && (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="absolute top-4 right-4 bg-white/90 text-gray-900 px-3 py-1 rounded-lg"
                                >
                                    {selectedFilter.description}
                                </motion.div>
                            )}
                        </div>

                        <div className="flex justify-center gap-4">
                            <motion.button
                                onClick={() => {
                                    setPhoto(null);
                                    setSelectedFilter(null);
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 
                                       transition-colors transform hover:scale-105 active:scale-95"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Start Over 🔄
                            </motion.button>
                            <motion.button
                                onClick={savePhoto}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 
                                       transition-colors transform hover:scale-105 active:scale-95"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Save Photo 💾
                            </motion.button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 