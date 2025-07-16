import { HttpResponse, http } from 'msw'

const path = /(\/aaa222)$/
export default [
  http.get(path, async () => {
    return HttpResponse.json({
      common: {
        code: '000000',
        detail: '222',
        type: null,
      },
    })
  }),
]
