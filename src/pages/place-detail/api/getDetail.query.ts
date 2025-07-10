import { queryOptions } from '@tanstack/react-query';

export interface PlaceDetailData {
  title: string;
  introduction: string;
  tag: string;
  address: string;
  photoId: number;
  imgPath: string;
  contentsId: string;
  source: string;
  responseTime: number;
  url: string; // TODO: 달라질 수 있음 (음성 파일 url)
  script: string; // TODO: 달라질 수 있음 (스크립트)
}

interface PlaceDetailResponse {
  success: boolean;
  message: string;
  data: PlaceDetailData;
  errorCode: null;
  timestamp: string;
}

const legendText = `옛날 옛적, 제주 하늘이랑 땅이 아직 다 만들어지멍 살아지던 시절에, 커다란 거인 하나 살았주게. 그 할망 이름이 설문대할망이라 했주.
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

const mockData: PlaceDetailResponse = {
  success: true,
  message: '관광지 정보 조회 성공',
  data: {
    title: '성산일출봉(UNESCO 세계자연유산)',
    introduction: '바다위에 우뚝 솟아난 수성화산·유네스코 세계자연유산, 천연기념물 제420호, 올레1코스',
    tag: '제주도관광, 제주동쪽코스, 세계자연유산, 유네스코, 제주자연, 산책로, 제주올레, 포토스팟',
    address: '제주특별자치도 서귀포시 성산읍 일출로 284-12',
    photoId: 2019022640791,
    imgPath: 'https://api.cdn.visitjeju.net/photomng/imgpath/202409/20/b2087c57-7cb6-420d-a840-c6e7e581072e.png',
    contentsId: 'CONT_000000000500349',
    source: 'API',
    responseTime: 16,
    url: '/sample.mp3',
    script: legendText,
  },
  errorCode: null,
  timestamp: '2025-07-10T23:18:54',
};

function getDetail(contentsId: string): Promise<PlaceDetailResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('getDetail', contentsId);
      resolve(mockData);
    }, 1000);
  });
}

export const detailQueryOptions = (contentsId: string) => {
  return queryOptions({
    queryKey: ['getDetail', contentsId],
    queryFn: () => getDetail(contentsId),
  });
};
