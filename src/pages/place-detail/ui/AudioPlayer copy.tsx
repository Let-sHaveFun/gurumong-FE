import { IconButton } from '@vapor-ui/core';
import { PlayIcon, PauseIcon, FunctionIcon } from '@vapor-ui/icons';
import { useRef, useEffect, useState } from 'react';

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    // 스킵 방지
    const handleSeeking = () => {
      console.log('스킵 시도 차단');
      audio.currentTime = currentTime;
    };

    const handleContextMenu = (e: Event) => {
      e.preventDefault();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('seeking', handleSeeking);
    audio.addEventListener('contextmenu', handleContextMenu);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('seeking', handleSeeking);
      audio.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [currentTime]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error('재생 실패:', error);
      });
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  return (
    <main>
      {/* 숨겨진 오디오 요소 */}
      <audio ref={audioRef} src="/sample.mp3" preload="auto" className="hidden" />

      {/* 커스텀 오디오 플레이어 */}
      <div className="w-full bg-white rounded-lg shadow-md p-4 border">
        <div className="flex items-center justify-center gap-4">
          {/* 재생/일시정지 버튼 */}
          <IconButton
            aria-label="재생/일시정지"
            onClick={handlePlayPause}
            disabled={isLoading}
            size="xl"
            color="primary"
            variant="fill"
            shape="circle"
            // className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
          >
            {/* <button
            // onClick={handlePlayPause}
            // disabled={isLoading}
            // className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
            > */}
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <PauseIcon width={24} height={24} />
            ) : (
              <PlayIcon width={24} height={24} />
              // <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20">
              //   <path
              //     fillRule="evenodd"
              //     d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              //     clipRule="evenodd"
              //   />
              // </svg>
            )}
            {/* </button> */}
          </IconButton>

          {/* 진행률 표시바 (클릭 불가) */}
          <div className="flex-1 flex items-center gap-3">
            {/* <span className="text-sm text-gray-600 min-w-[40px]">{formatTime(currentTime)}</span> */}

            <ProgressBar progressPercentage={progressPercentage} />

            {/* <span className="text-sm text-gray-600 min-w-[40px]">{formatTime(duration)}</span> */}
          </div>
        </div>

        {/* 재생 상태 표시 */}
        <div className="mt-2 text-center">
          <span className="text-xs text-gray-500">{isLoading ? '로딩 중...' : isPlaying ? '재생 중' : '일시정지'}</span>
        </div>
      </div>
    </main>
  );
}

function ProgressBar({ progressPercentage }: { progressPercentage: number }) {
  return (
    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
      <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
    </div>
  );
}
