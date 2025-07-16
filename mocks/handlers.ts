import { flatten } from 'lodash-es'

import mockSlices from './index-slices'

export const handlers = flatten(Object.values(mockSlices))
