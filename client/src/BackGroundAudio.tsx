import { useRef, useState } from 'react';

export function BackGroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="audioButtonBackground">
      <audio ref={audioRef} loop>
        <source src="/PokeMart.mp3" type="audio/mpeg" />
      </audio>
      <button className="audioButton" onClick={togglePlay}>
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>
    </div>
  );
}
