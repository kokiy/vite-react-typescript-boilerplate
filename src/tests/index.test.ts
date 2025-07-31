import { get } from 'lodash-es';

import { getV1Organizations } from '@/services/sdk.gen';

test('responds with the user', async () => {
  const response = await getV1Organizations();

  await expect(get(response, 'data.filters')).toEqual({
    end_cursor: '3',
    has_next_page: true,
    has_previous_page: true,
    start_cursor: '33',
  });
});
