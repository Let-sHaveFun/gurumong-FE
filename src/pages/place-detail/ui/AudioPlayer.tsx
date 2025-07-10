import { useRef, useEffect, useState } from 'react';
import { IconButton, Text } from '@vapor-ui/core';
import { PlayIcon, PauseIcon } from '@vapor-ui/icons';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { cn, typography } from '@/shared/style';

export function AudioPlayer({ onCompleteAudio }: { onCompleteAudio: () => void }) {
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
      // 오디오 재생 위치를 처음으로 되돌림
      audio.currentTime = 0;
      onCompleteAudio();
    };

    // 스킵 방지
    // const handleSeeking = () => {
    //   console.log('스킵 시도 차단');
    //   audio.currentTime = currentTime;
    // };

    const handleContextMenu = (e: Event) => {
      e.preventDefault();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    // audio.addEventListener('seeking', handleSeeking);
    audio.addEventListener('contextmenu', handleContextMenu);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      // audio.removeEventListener('seeking', handleSeeking);
      audio.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [currentTime]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // 재생이 끝났을 때 다시 재생하려면 처음부터 시작
      if (audio.ended) {
        audio.currentTime = 0;
      }
      audio.play().catch((error) => {
        console.error('재생 실패:', error);
      });
    }
  };

  //
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  //
  // const audioUrl = 'https://collection.cloudinary.com/deggvyhsw/75da97ff00634d6a2746b3c79010f7aa';
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full z-20 relative ">
      <audio ref={audioRef} src="/sample.mp3" preload="auto" className="hidden" />
      {/* <audio ref={audioRef} src={audioUrl} preload="auto" className="hidden" /> */}

      {/* 진행률 표시바 */}
      <div className="relative w-full h-[10px] bg-gray-200 translate-y-[7px] rounded-[16px]">
        <ProgressBar progressPercentage={progressPercentage} className="absolute bottom-0 left-0 w-full h-full" />
      </div>

      <div className="w-full bg-white rounded-lg p-4 border rounded-tl-[8px] rounded-tr-[8px] rounded-br-[0px] rounded-bl-[0px] z-0 relative">
        <div className="flex items-center justify-center gap-4 relative">
          <Text className={cn(typography.body2, 'text-[#558CF5] absolute left-0 top-[0]')}>
            {formatTime(currentTime)}
          </Text>

          {/* 재생/일시정지 버튼 */}
          <IconButton
            aria-label="재생/일시정지"
            onClick={handlePlayPause}
            disabled={isLoading}
            size="xl"
            color="primary"
            variant="fill"
            shape="circle"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <PauseIcon width={24} height={24} />
            ) : (
              <PlayIcon width={24} height={24} />
            )}
          </IconButton>

          <Text className={cn(typography.body2, 'text-[#558CF5] absolute right-0 top-[0]')}>
            {formatTime(duration)}
          </Text>
        </div>
      </div>
    </div>
  );
}
