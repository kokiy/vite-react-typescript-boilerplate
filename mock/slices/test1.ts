import { HttpResponse, http } from 'msw';

const test1 = [
  http.get(/(\/organizations)$/, () =>
    HttpResponse.json({
      filters: {
        end_cursor: '3',
        has_next_page: true,
        has_previous_page: true,
        start_cursor: '33',
      },
    }),
  ),
];

export default test1;
