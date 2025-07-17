import { HttpResponse, http } from 'msw'

export default [
  http.get(/(\/organizations)$/, async () => {
    return HttpResponse.json({
      filters: {
        end_cursor: '3',
        has_next_page: true,
        has_previous_page: true,
        start_cursor: '33',
      },
    })
  }),
]
