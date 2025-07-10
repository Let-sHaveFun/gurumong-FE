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
];
