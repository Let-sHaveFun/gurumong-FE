import { Flex } from '@vapor-ui/core';
import { AudioPlayer } from './AudioPlayer';

export function PlaceDetailPage() {
  return (
    <main>
      <Flex gap="$100" flexDirection="column">
        <div>뒤로가기</div>
        <div>안내판(이름 장소)</div>
        <div className="h-[200px] bg-gray-200">사진 영역</div>
        <div className="h-[200px] bg-gray-200">스크립트 영역</div>

        <AudioPlayer />
      </Flex>
    </main>
  );
}
