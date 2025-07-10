// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { MOCK_DATA } from './data';

export const handlers = [
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John gyu',
      lastName: 'Maverick',
    });
  }),

  http.get('https://api.example.com/heritages', () => {
    const data = MOCK_DATA.filter((data: any) => data?.distance <= 20);
    return HttpResponse.json(data);
  }),

  // 'search' 경로의 모든 GET 요청을 처리하고, 쿼리 파라미터를 동적으로 읽습니다.
  http.get('https://api.example.com/search', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query'); // 'query' 파라미터 값을 가져옵니다.

    console.log('gyu 22', query);

    // 검색어가 없는 경우 빈 배열을 반환합니다.
    if (!query) {
      return HttpResponse.json([]);
    }

    // 가져온 query 값으로 데이터를 필터링합니다.
    const data = MOCK_DATA.filter((data: any) => data?.name.includes(query));
    return HttpResponse.json(data);
  }),

  http.get('https://api.example.com/search', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query'); // 'query' 파라미터 값을 가져옵니다.

    console.log('gyu 22', query);

    // 검색어가 없는 경우 빈 배열을 반환합니다.
    if (!query) {
      return HttpResponse.json([]);
    }

    // 가져온 query 값으로 데이터를 필터링합니다.
    const data = MOCK_DATA.filter((data: any) => data?.name.includes(query));
    return HttpResponse.json(data);
  }),

  http.get('https://api.example.com/heritage/:id', ({ request }) => {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // 'query' 파라미터 값을 가져옵니다.

    console.log('gyu 22', id);
    // 검색어가 없는 경우 빈 배열을 반환합니다.
    if (!id) {
      return HttpResponse.json(null);
    }

    // 가져온 query 값으로 데이터를 필터링합니다.
    const data = MOCK_DATA.find((data: any) => data?.external_id === id);
    return HttpResponse.json(data);
  }),
];
