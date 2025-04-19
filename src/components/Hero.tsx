import React from 'react';

interface HeroProps {
  imageUrl: string;
  title?: string;
  subtitle?: string;
}

const Hero: React.FC<HeroProps> = ({ imageUrl, title, subtitle }) => {
  return (
    <section className="relative w-full py-12">
      <div className="container mx-auto px-4">
        {/* Content with decorative image */}
        <div className="flex flex-col items-center">
          {/* Decorative image container */}
          <div className="relative mb-8 group">
            {/* Image with decorative border and effects */}
            <div className="relative p-2 bg-gradient-to-r from-primary to-neutral rounded-lg shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
              {/* Birthday Cap */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-t-full transform -rotate-12">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-white"></div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full"></div>
                </div>
              </div>

              

              {/* Decorative corner elements */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-neutral rounded-tr-lg" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-neutral rounded-br-lg" />
              
              {/* Main image */}
              <img 
                src={imageUrl}
                alt="Jane Birthday Celebration"
                className="w-[300px] h-[400px] object-cover rounded-lg shadow-inner"
              />
              
              {/* Decorative sparkle effects */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-pulse" />
              <div className="absolute -top-6 left-1/2 w-4 h-4 bg-blue-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Text content */}
          <div className="text-center">
            {title && (
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-xl md:text-2xl text-gray-700 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
