import { Badge, Box, Dialog, Flex, Text } from '@vapor-ui/core';
import { BackPageOutlineIcon } from '@vapor-ui/icons';
import textBackground from '@/assets/text-backgorund.png'; // 경로에 맞게 수정해주세요.
import badgeImage from '@/assets/badge.png'; // 경로에 맞게 수정해주세요.

import { AudioPlayer } from './AudioPlayer';
import { FixedBottom } from '@/shared/ui';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDormungStore } from '@/shared/store';
import { BADGE_IMAGES } from '@/shared/constants/badge-images';

const legendText = `옛날 옛적, 제주 하늘이랑 땅이 아직 다 만들어지멍 살아지던 시절에, 커다란 거인 하나 살았주게. 그 할망 이름이 설문대할망이라 했주. 
몸집이 어찌나 큰지, 발 한 번 딛으면 한라산에서 성산포까지 훌쩍 걸어댕길 수 있었주게.

하르방도 엄서서 자식 서른을 혼자 키우고, 하루종일 밭 매고 물 길어 나르멍 억척스럽게 살았주게. 
근데 말이주, 아무리 큰 할망이어도 그 많은 자식 입을 다 먹여살리는 건 보통 일이 아니주게. 그래서 하루는 설문대할망이 말했주게. 
“얘들아, 엄마가 너희들 밥 지어줄 솥 하나 커다란 거 만들어줄 테니 기다려보라!” 

할망은 오름이랑 산을 죄다 뒤져 돌을 모으고, 큰 솥을 만들라 쌓아댔주게. 낮에는 돌 옮기고 밤에는 흙 다져서 날마다 솥을 만들었주. 
그렇게 만들어진 솥은 제주 동쪽 바당가에 우뚝 솟았주게. 그게 바로 지금의 성산일출봉이라! 
근데 말이주, 솥은 다 만들어졌는디, 마침 하늘이 밝아지는 거 아니우꽈! 할망은 “아이고! 해 뜨면 안되는데!” 허멍 급히 솥 완성하려고 하다가 그만 바닥에 발 헛디뎌서 퍽 자빠져 뒈져붑써... 
자식들은 울고불고 난리였주게. “엄마야... 솥 다 만들어놓고 이케 가시믄 어떵하민수과...” 

그래도 할망의 정성이 남아서인지, 그 솥 같은 성산일출봉은 지금도 딱 그 자리에 우뚝 서서, 해 뜨는 거 맞이허고 있주게. 
제주 사람들은 매일 그 자리에 올라가서, 할망이 남기고 간 기운을 맞으며 새날을 시작한답주.`;

export function PlaceDetailPage() {
  const navigate = useNavigate();
  const { placeId } = useParams();

  const [isBadgeOpen, setIsBadgeOpen] = useState(false);

  const { badges, addBadge } = useDormungStore();

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
      return;
    }

    // 다른 장소 추가 로직 (API 의 이름으로 할 예정)
    addBadge({ id: placeId, name: '아무개', image: BADGE_IMAGES[Math.floor(Math.random() * BADGE_IMAGES.length)] });
    setIsBadgeOpen(true);
    // save 데이터 저장
  };

  return (
    <Box className="bg-[#558CF5]">
      <Flex gap="$100" flexDirection="column" padding="$000">
        <header className="px-4 py-3 ">
          <Flex gap="$100" alignItems="center" justifyContent="center">
            <BackPageOutlineIcon width={24} height={24} className="text-white" onClick={() => navigate('/')} />
            <Text typography="heading5" className="w-full text-center text-white">
              성산일출봉
            </Text>
          </Flex>
        </header>
        <section className="h-[200px] my-12">
          <img src="/place-image.gif" alt="" className="w-full h-full object-cover" />
        </section>
        <section
          className="bg-contain bg-no-repeat bg-center h-[550px]"
          style={{ backgroundImage: `url(${textBackground})` }}
        >
          <div className="overflow-y-auto h-[400px] mt-[120px] px-10">
            <div className="overflow-y-auto mb-[100px]">
              <Text typography="body2" className="whitespace-pre-line">
                {legendText}
              </Text>
            </div>
          </div>
        </section>
        <FixedBottom className="p-0">
          <AudioPlayer onCompleteAudio={onCompleteAudio} />
        </FixedBottom>

        <Dialog.Root open={isBadgeOpen} onOpenChange={setIsBadgeOpen}>
          <Dialog.Overlay className="" />
          <Dialog.CombinedContent className="w-[393px] h-full p-10 bg-transparent border-none">
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
