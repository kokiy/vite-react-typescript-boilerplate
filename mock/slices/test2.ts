import { HttpResponse, http } from 'msw';

const path = /(\/aaa222)$/;
const test2 = [
  http.get(path, () =>
    HttpResponse.json({
      common: {
        code: '000000',
        detail: '222',
        type: undefined,
      },
    }),
  ),
];

export default test2;
