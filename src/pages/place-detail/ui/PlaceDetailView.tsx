import { Badge, Box, Dialog, Flex, Text } from '@vapor-ui/core';
import { BackPageOutlineIcon } from '@vapor-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import textBackground from '@/assets/text-backgorund.png'; // 경로에 맞게 수정해주세요.
import badgeImage from '@/assets/badge.png'; // 경로에 맞게 수정해주세요.

import { AudioPlayer } from './AudioPlayer';
import { FixedBottom } from '@/shared/ui';
import { useDormungStore } from '@/shared/store';
import { cn, typography } from '@/shared/style';
import type { Heritage } from '@/entities/heritage';

export function PlaceDetailView({ heritage }: { heritage: Heritage }) {
  const navigate = useNavigate();
  const { placeId } = useParams();

  const [isBadgeOpen, setIsBadgeOpen] = useState(false);

  const { badges, addBadge } = useDormungStore();

  const onCompleteAudio = () => {
    if (!placeId) return;
    if (badges.find((badge) => badge.id === placeId)) return;

    // 성산일출봉 추가 로직
    if (placeId === 'CONT_000000000500349') {
      addBadge({ id: placeId, name: '성산일출봉', image: '/story-fragment-4.png' });
      setIsBadgeOpen(true);
      return;
    }

    // 다른 장소 추가 로직 (API 의 이름으로 할 예정)
    // addBadge({ id: placeId, name: '아무개', image: BADGE_IMAGES[Math.floor(Math.random() * BADGE_IMAGES.length)] });
    // setIsBadgeOpen(true);
    // save 데이터 저장
  };

  const audioUrlRaw = heritage?.audioUrl ?? '';
  const audioUrl = audioUrlRaw.replace(/\r|\n/g, '').trim();
  const isHaveScript = !!heritage?.script;
  const showPlayer = isHaveScript && Boolean(audioUrl);

  return (
    <Box className="bg-[#558CF5] h-screen">
      <Flex gap="$100" flexDirection="column" padding="$000" className="flex flex-col h-full">
        <header className="px-4 py-3 shrink-0">
          <Flex gap="$100" alignItems="center" justifyContent="center" className="flex">
            <BackPageOutlineIcon width={24} height={24} className="text-white" onClick={() => navigate('/')} />
            <Text typography="heading5" className={cn(typography.heading5, 'w-full text-center text-white')}>
              {heritage?.name}
            </Text>
          </Flex>
        </header>

        <section className="h-[200px] shrink-0">
          <img src="/place-image.gif" alt="" className="w-full h-full object-cover" />
        </section>

        <section
          className="bg-contain bg-no-repeat bg-center flex-1 flex"
          style={{ backgroundImage: `url(${textBackground})`, backgroundSize: 'cover' }}
        >
          <div className="overflow-y-auto mt-[120px] px-10 w-full">
            <div className="pb-[100px]">
              <Text typography="body2" className={cn(typography.body2, 'whitespace-pre-line')}>
                {isHaveScript ? heritage?.script : '서비스를 준비중입니다.'}
              </Text>
            </div>
          </div>
        </section>

        {showPlayer && (
          <FixedBottom className="p-0">
            <AudioPlayer onCompleteAudio={onCompleteAudio} audioUrl={audioUrl} />
          </FixedBottom>
        )}

        <Dialog.Root open={isBadgeOpen} onOpenChange={setIsBadgeOpen}>
          <Dialog.Overlay className="" />
          <Dialog.CombinedContent className="w-[393px] h-full p-10 bg-transparent border-none justify-center gap-2">
            <Flex flexDirection="column" gap="$100">
              <img src={badgeImage} alt="badge" className="w-[300px] h-[300px] object-cover" />
              <Badge
                color="hint"
                size="lg"
                shape="pill"
                className="bg-white flex justify-center"
                onClick={() => setIsBadgeOpen(false)}
              >
                새로운 이야기조각을 받았어요!
              </Badge>
            </Flex>
          </Dialog.CombinedContent>
        </Dialog.Root>
      </Flex>
    </Box>
  );
}
