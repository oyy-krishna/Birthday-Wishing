import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Card {
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const emojis = ['🎂', '🎁', '🎈', '🎉', '🎊', '🎀', '🎆', '🎇'];

export default function MemoryGame() {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const cardPairs = [...emojis, ...emojis];
        const shuffledCards = cardPairs
            .sort(() => Math.random() - 0.5)
            .map((value, index) => ({
                id: index,
                value,
                isFlipped: false,
                isMatched: false
            }));
        setCards(shuffledCards);
        setFlippedCards([]);
        setMoves(0);
        setGameComplete(false);
    };

    const handleCardClick = (cardId: number) => {
        if (flippedCards.length >= 2 || cards[cardId].isFlipped || cards[cardId].isMatched) {
            return;
        }

        const newCards = [...cards];
        newCards[cardId].isFlipped = true;
        setCards(newCards);

        const newFlippedCards = [...flippedCards, cardId];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setMoves(moves + 1);
            const [firstCard, secondCard] = newFlippedCards;
            
            if (cards[firstCard].value === cards[secondCard].value) {
                // Match found
                setTimeout(() => {
                    const matchedCards = [...cards];
                    matchedCards[firstCard].isMatched = true;
                    matchedCards[secondCard].isMatched = true;
                    setCards(matchedCards);
                    setFlippedCards([]);

                    // Check if game is complete
                    if (matchedCards.every(card => card.isMatched)) {
                        setGameComplete(true);
                    }
                }, 500);
            } else {
                // No match
                setTimeout(() => {
                    const resetCards = [...cards];
                    resetCards[firstCard].isFlipped = false;
                    resetCards[secondCard].isFlipped = false;
                    setCards(resetCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    return (
        <div className="text-center">
            <div className="mb-6">
                <p className="text-xl text-gray-700">Moves: {moves}</p>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                {cards.map((card) => (
                    <motion.div
                        key={card.id}
                        className={`aspect-square flex items-center justify-center text-4xl cursor-pointer
                            ${card.isMatched ? 'bg-green-100' : 'bg-white'} rounded-lg shadow-lg
                            transform transition-transform duration-300`}
                        onClick={() => handleCardClick(card.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <AnimatePresence>
                            {card.isFlipped || card.isMatched ? (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                >
                                    {card.value}
                                </motion.span>
                            ) : (
                                <motion.span
                                    initial={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg"
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {gameComplete && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-4 bg-green-100 rounded-lg"
                >
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Congratulations! 🎉</h3>
                    <p className="text-green-700">You completed the game in {moves} moves!</p>
                    <button
                        onClick={initializeGame}
                        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600
                               transition-colors transform hover:scale-105 active:scale-95"
                    >
                        Play Again
                    </button>
                </motion.div>
            )}
        </div>
    );
} 