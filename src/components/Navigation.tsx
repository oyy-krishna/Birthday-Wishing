import React from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
    onNavigate: (component: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
    return (
        <div className="flex flex-col gap-4 items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex gap-4"
            >
                <button
                    onClick={() => onNavigate('messages')}
                    className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors shadow-lg"
                >
                    <span className="text-xl">💌</span>
                    <span>Messages</span>
                </button>
                <button
                    onClick={() => onNavigate('photo-fun')}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors shadow-lg"
                >
                    <span className="text-xl">📸</span>
                    <span>Photo Fun</span>
                </button>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <button
                    onClick={() => onNavigate('games')}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
                >
                    <span className="text-xl">🎮</span>
                    <span>Games</span>
                </button>
            </motion.div>
        </div>
    );
} 