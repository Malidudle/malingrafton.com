import { useState, useRef, useEffect } from "react";
import { Play, Pause, Undo, Redo, Volume2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Song, SONGS } from "@/data/songs";

const Music = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [currentSong, setCurrentSong] = useState<Song>(SONGS[0]);
  const [hoveredSongIndex, setHoveredSongIndex] = useState<number | null>(null);
  const [durations, setDurations] = useState<number[]>(
    Array(SONGS.length).fill(0),
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const loadSongDurations = async () => {
      const newDurations = await Promise.all(
        SONGS.map(
          (song) =>
            new Promise<number>((resolve) => {
              const audio = new Audio(song.src);
              audio.addEventListener("loadedmetadata", () => {
                resolve(audio.duration);
              });
            }),
        ),
      );
      setDurations(newDurations);
    };
    loadSongDurations();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.volume = volume / 100;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSkipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0,
      );
    }
  };

  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        audioRef.current.duration,
      );
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  const handleSongSelect = (song: Song) => {
    if (song.src === currentSong.src) {
      return;
    }
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="pb-32 text-white">
      <div>
        <audio ref={audioRef} src={currentSong.src}></audio>
      </div>

      {/* Song List */}
      <div className="p-4">
        <div className="flex gap-4">
          <Image
            src="/basquiat.jpg"
            alt="Playboi Carti"
            className="z-40 h-48 w-48 rounded-md object-cover"
            width={500}
            height={500}
            loading="eager"
          />
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm opacity-50">Playlist</p>
              <h2 className="mt-4 text-7xl font-black">Random Playlist</h2>
            </div>
            <p className="mt-auto flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/carti.jpg" alt="Playboi Carti" />
                <AvatarFallback>MG</AvatarFallback>
              </Avatar>
              By Malin
            </p>
          </div>
        </div>
        <ul className="mt-12 space-y-4 overflow-scroll">
          {SONGS.map((song, index) => (
            <li
              key={index}
              className="flex cursor-pointer items-center justify-between rounded-md bg-white/20 p-4 hover:underline"
              onClick={() => handleSongSelect(song)}
              onMouseEnter={() => setHoveredSongIndex(index)}
              onMouseLeave={() => setHoveredSongIndex(null)}
            >
              <div className="flex items-center">
                <div className="w-10">
                  {hoveredSongIndex === index ? (
                    <Play className="h-6 w-6" />
                  ) : (
                    index + 1
                  )}
                </div>
                <Image
                  src={song.cover}
                  alt=""
                  className="h-10 w-10 rounded-md"
                  width={50}
                  height={50}
                  loading="eager"
                />
                <div className="ml-2">
                  <p className="text-sm">{song.title}</p>
                  <p className="text-xs text-slate-500">{song.artist}</p>
                </div>
              </div>
              <div className="text-xs text-slate-500">
                {formatTime(durations[index])}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Music Player */}
      <div className="fixed bottom-0 grid w-[99%] grid-cols-3 gap-4 rounded-b-xl bg-black p-4">
        <div className="flex items-center gap-4">
          <Image
            src={currentSong.cover}
            className="z-40 h-20 w-20 rounded-md object-cover"
            alt=""
            width={500}
            height={500}
            loading="eager"
          />
          <div>
            <p className="text-sm">{currentSong.title}</p>
            <p className="text-xs text-slate-500">{currentSong.artist}</p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-4">
            <button onClick={handleSkipBack} className="relative">
              <Undo className="ml-0.5 h-6 w-6" />
              <span className="absolute left-2 top-3.5 text-xs">10</span>
            </button>
            <button
              className="flex items-center justify-center rounded-full bg-white p-1"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 text-black" />
              ) : (
                <Play className="h-6 w-6 text-black" />
              )}
            </button>
            <button onClick={handleSkipForward} className="relative">
              <Redo className="ml-0.5 h-6 w-6" />
              <span className="absolute right-1.5 top-3.5 text-xs">10</span>
            </button>
          </div>
          <Progress value={progress} max={100} className="h-2 w-full" />
        </div>

        <div className="flex justify-end">
          <div className="mb-2 mt-auto flex items-center gap-2">
            <Volume2 />
            <Slider
              className="w-32"
              value={[volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
