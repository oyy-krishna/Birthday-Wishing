'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Surprise from '../components/Surprise';
import Hero from '../components/Hero';
import Navigation from '../components/Navigation';
import Messages from '../components/Messages';
import PhotoFun from '@/components/PhotoFun';
import Footer from '../components/Footer';
import Games from '@/components/Games';

export default function Home() {
  const [showSurprise, setShowSurprise] = useState(true);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [showHero, setShowHero] = useState(true);

  const handleNavigate = (component: string) => {
    setShowHero(false);
    setActiveComponent(component);
  };

  const handleBack = () => {
    setShowHero(true);
    setActiveComponent(null);
  };

  const handleReveal = () => {
    setShowSurprise(false);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'games':
        return <Games />;
      case 'messages':
        return <Messages />;
      case 'photo-fun':
        return <PhotoFun />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-primary to-neutral">
      <AnimatePresence mode="wait">
        {showSurprise ? (
          <Surprise onReveal={handleReveal} />
        ) : showHero ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center p-4"
          >
            <Hero 
              imageUrl="/IMG_20250119_232239.jpg"
              title="Happy Birthday, Jane!"
              subtitle="Click below to explore the celebration!"
            />
            <Navigation onNavigate={handleNavigate} />
          </motion.div>
        ) : (
          <motion.div
            key="component"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen p-4"
          >
            <button
              onClick={handleBack}
              className="mb-4 md:mb-6 px-4 py-2 bg-white text-gray-900 rounded-lg shadow hover:shadow-lg transition-all text-sm md:text-base"
            >
              ← Back to Home
            </button>

            {renderComponent()}
          </motion.div>
        )}
      </AnimatePresence>
      {!showSurprise && <Footer />}
    </main>
  );
}
