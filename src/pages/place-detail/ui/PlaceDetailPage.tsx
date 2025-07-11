import { Badge, Box, Dialog, Flex, Text } from '@vapor-ui/core';
import { BackPageOutlineIcon } from '@vapor-ui/icons';
import textBackground from '@/assets/text-backgorund.png'; // 경로에 맞게 수정해주세요.
import badgeImage from '@/assets/badge.png'; // 경로에 맞게 수정해주세요.

import { AudioPlayer } from './AudioPlayer';
import { FixedBottom } from '@/shared/ui';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDormungStore } from '@/shared/store';
import { cn, typography } from '@/shared/style';
import { getHeritageById } from '@/mocks/getHeritageById';
// import { BADGE_IMAGES } from '@/shared/constants/badge-images';

// const legendText = `옛날 옛적, 제주 하늘이랑 땅이 아직 다 만들어지멍 살아지던 시절에, 커다란 거인 하나 살았주게. 그 할망 이름이 설문대할망이라 했주.
// 몸집이 어찌나 큰지, 발 한 번 딛으면 한라산에서 성산포까지 훌쩍 걸어댕길 수 있었주게.

// 하르방도 엄서서 자식 서른을 혼자 키우고, 하루종일 밭 매고 물 길어 나르멍 억척스럽게 살았주게.
// 근데 말이주, 아무리 큰 할망이어도 그 많은 자식 입을 다 먹여살리는 건 보통 일이 아니주게. 그래서 하루는 설문대할망이 말했주게.
// “얘들아, 엄마가 너희들 밥 지어줄 솥 하나 커다란 거 만들어줄 테니 기다려보라!”

// 할망은 오름이랑 산을 죄다 뒤져 돌을 모으고, 큰 솥을 만들라 쌓아댔주게. 낮에는 돌 옮기고 밤에는 흙 다져서 날마다 솥을 만들었주.
// 그렇게 만들어진 솥은 제주 동쪽 바당가에 우뚝 솟았주게. 그게 바로 지금의 성산일출봉이라!
// 근데 말이주, 솥은 다 만들어졌는디, 마침 하늘이 밝아지는 거 아니우꽈! 할망은 “아이고! 해 뜨면 안되는데!” 허멍 급히 솥 완성하려고 하다가 그만 바닥에 발 헛디뎌서 퍽 자빠져 뒈져붑써...
// 자식들은 울고불고 난리였주게. “엄마야... 솥 다 만들어놓고 이케 가시믄 어떵하민수과...”

// 그래도 할망의 정성이 남아서인지, 그 솥 같은 성산일출봉은 지금도 딱 그 자리에 우뚝 서서, 해 뜨는 거 맞이허고 있주게.
// 제주 사람들은 매일 그 자리에 올라가서, 할망이 남기고 간 기운을 맞으며 새날을 시작한답주.`;

export function PlaceDetailPage() {
  const navigate = useNavigate();
  const { placeId } = useParams();

  const [isBadgeOpen, setIsBadgeOpen] = useState(false);

  const { badges, addBadge } = useDormungStore();

  const [heritage, setHeritage] = useState<any | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const found = await getHeritageById(placeId ?? '');
      setHeritage(found);
    };
    fetch();
  }, [placeId]);

  console.log(heritage);

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
  const isExistAudio = !!heritage?.audioUrl;

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
