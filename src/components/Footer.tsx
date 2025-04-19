// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-primary to-neutral py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-base font-medium text-gray-900">
          Made with 💖 by a clumsy guy who just wanted to make your day special.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
