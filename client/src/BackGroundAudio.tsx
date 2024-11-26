import { useRef, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

/**
 * Renders the BackGroundAudio component, providing background audio playback
 * with a play/pause button.
 *
 * @returns {JSX.Element}
 */

export function BackGroundAudio() {
  //useRef bc it doesnt cause rerenders when updated
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
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
}
