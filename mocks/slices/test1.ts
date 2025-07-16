import { HttpResponse, http } from 'msw'

export default [
  http.get(/(\/organizations)$/, async () => {
    return HttpResponse.json({
      common: {
        code: '000000',
        detail: '111',
        type: null,
      },
    })
  }),
]
