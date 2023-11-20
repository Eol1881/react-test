import { HttpResponse, delay, http } from 'msw';

export const handlers = [
  http.get(`https://TODO*`, async () => {
    await delay(250);
    return HttpResponse.json('TODO', {
      status: 200,
    });
  }),
];
