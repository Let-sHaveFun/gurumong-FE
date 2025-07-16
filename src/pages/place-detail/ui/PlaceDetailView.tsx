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

  const { badges, addBadge } = useDormungStore((state) => ({
    badges: state.badges,
    addBadge: state.addBadge,
  }));

  const onCompleteAudio = () => {
    if (!placeId) return;
    if (badges.find((badge) => badge.id === placeId)) return;

    // {
    //   id: 'CONT_000000000500349',
    //   name: '성산일출봉',
    //   image: '/story-fragment-4.png',
    // },
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

  //   {
  //     "imgPath": "https://api.cdn.visitjeju.net/photomng/imgpath/201912/04/f5a94d92-dc05-4ef2-b799-53447d18f03c.jpg",
  //     "audioUrl": "https://res.cloudinary.com/deggvyhsw/video/upload/v1752177532/%E1%84%80%E1%85%A1%E1%86%B7%E1%84%80%E1%85%B2%E1%86%AF%E1%84%87%E1%85%A1%E1%86%A8%E1%84%86%E1%85%AE%E1%86%AF%E1%84%80%E1%85%AA%E1%86%AB_c4mk6e.mp3\r",
  //     "script": "귤 좋아허우꽈? 그럼 여기 오민 진짜 취향 저격이우다잉.
  // 감귤박물관은 말이주게, 제주 감귤에 대해 몬딱 다 알 수 있는 곳이우다.\n입구 안내판 보멍 “국내서 처음 생긴 감귤 전문 박물관”이라 허는데, 안 들어가보민 귤 종류가 얼만큼 많은지 놀라지 않을 수 없을 껄?\n전시실에는 옛날에 쓰던 감귤 상자 포장지서부터, 감귤 따는 농기구, 세계 각국 감귤까지 몽땅 전시돼 있수다.\n근데 진짜 재미진 건 야외 체험장이우다잉. 계절 맞춰 가면 귤 따기 체험도 해볼 수 있고, 귤잼 만들기도 직접 해볼 수 있수다.\n박물관 정원에는 감귤나무만 해도 80종 넘게 심어져 있고, 거기다 아열대 과일나무들도 자라나서 산책하는 재미도 쏠쏠헙디다.\n안내판 보멍 어린이 놀이터도 잘 돼 있고, 피크닉 자리도 있으멍 하루종일 가족이랑 놀다 가기 딱 좋수다잉.\n제주 여행 와서 이만큼 귤 향기 가득한 박물관, 진짜 흔치 않우다. 혼저 한 번 가보주게 마씸!"
  // }
  const isExistAudio = !!heritage?.script;

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
                {isExistAudio ? heritage?.script : '서비스를 준비중입니다.'}
                {/* TODO: 임시로 구현한 걸로 높이 맞추기 위해서 안보이는 글 추가  */}
                {/* {!isExistAudio && <div className="opacity-0">{legendText}</div>} */}
              </Text>
            </div>
          </div>
        </section>

        {isExistAudio && (
          <FixedBottom className="p-0">
            <AudioPlayer onCompleteAudio={onCompleteAudio} audioUrl={heritage?.audioUrl ?? ''} />
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
