import React, { useRef, useEffect } from 'react';

interface AudioPlayerProps {
    type: 'click' | 'surprise' | 'celebration';
    play: boolean;
}

const soundUrls = {
    click: 'https://www.soundjay.com/button/beep-01a.mp3',
    surprise: 'https://www.soundjay.com/human/sounds/applause-8.mp3',
    celebration: 'https://www.soundjay.com/human/sounds/cheering-1.mp3'
};

export default function AudioPlayer({ type, play }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(soundUrls[type]);
            audioRef.current.preload = 'auto';
        }

        if (play) {
            try {
                audioRef.current.currentTime = 0;
                const playPromise = audioRef.current.play();
                
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error('Error playing sound:', error);
                        // Try to play again after a short delay
                        setTimeout(() => {
                            audioRef.current?.play().catch(console.error);
                        }, 1000);
                    });
                }
            } catch (error) {
                console.error('Error with audio:', error);
            }
        }
    }, [play, type]);

    return null; // We don't need to render anything
} 