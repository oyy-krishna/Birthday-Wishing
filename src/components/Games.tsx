"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemoryGame from './games/MemoryGame';
import QuizGame from './games/QuizGame';

interface Game {
    id: string;
    title: string;
    description: string;
    emoji: string;
    color: string;
    status: 'active' | 'development';
}

const games: Game[] = [
    {
        id: 'memory',
        title: "Memory Match",
        description: "Match pairs of birthday-themed cards. Can you find all the pairs?",
        emoji: "🧩",
        color: "from-pink-400 to-purple-500",
        status: 'active'
    },
    {
        id: 'quiz',
        title: "Guess the Fact",
        description: "Test how well you know Me! Fun questions about the Developer 😅",
        emoji: "🧠",
        color: "from-blue-400 to-teal-500",
        status: 'active'
    },
    {
        id: 'coloring',
        title: "Coloring Book",
        description: "Color beautiful birthday-themed illustrations. Let your creativity shine!",
        emoji: "🎨",
        color: "from-green-400 to-emerald-500",
        status: 'development'
    },
    {
        id: 'puzzle',
        title: "Classic Puzzles",
        description: "Enjoy classic puzzle games like Sudoku and Minesweeper with a birthday twist!",
        emoji: "🎯",
        color: "from-yellow-400 to-orange-500",
        status: 'development'
    }
];

export default function Games() {
    const [selectedGame, setSelectedGame] = useState<string | null>(null);

    const renderGame = () => {
        const game = games.find(g => g.id === selectedGame);
        
        if (!game) return null;

        if (game.status === 'development') {
            return (
                <div className="text-center p-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 shadow-lg"
                    >
                        <div className="text-6xl mb-6">🚧</div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Game Under Development
                        </h2>
                        <p className="text-gray-600 mb-6">
                            We're working hard to bring you an amazing gaming experience!
                            Check back soon for updates.
                        </p>
                        <motion.button
                            onClick={() => setSelectedGame(null)}
                            className="px-6 py-3 bg-gray-800 text-white rounded-lg
                                   hover:bg-gray-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Back to Games
                        </motion.button>
                    </motion.div>
                </div>
            );
        }

        switch (game.id) {
            case 'memory':
                return <MemoryGame />;
            case 'quiz':
                return <QuizGame />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary to-neutral">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Birthday Games! 🎮
                </h1>
                <p className="text-xl text-white/80">
                    Choose a fun game to play!
                </p>
            </motion.div>

            {!selectedGame ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                    {games.map((game) => (
                        <motion.div
                            key={game.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`bg-gradient-to-br ${game.color} rounded-2xl shadow-2xl p-6 cursor-pointer
                                    transform transition-all duration-300`}
                            onClick={() => setSelectedGame(game.id)}
                        >
                            <div className="text-4xl mb-4">{game.emoji}</div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {game.title}
                            </h2>
                            <p className="text-white/80">
                                {game.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={() => setSelectedGame(null)}
                            className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 
                                   transition-colors transform hover:scale-105 active:scale-95"
                        >
                            ← Back to Games
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {games.find(g => g.id === selectedGame)?.title}
                        </h2>
                    </div>
                    {renderGame()}
                </div>
            )}
        </div>
    );
}