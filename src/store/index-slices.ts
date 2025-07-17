import { each } from 'lodash-es'
import type { StateCreator } from 'zustand'

import type { GlobalState } from './index-type'

interface ModuleImportInterface {
  default: StateCreator<GlobalState>
}

const modules: Record<string, StateCreator<GlobalState>> = {}
const viteRequireContext = import.meta.glob<ModuleImportInterface>(
  './slices/*.ts',
  {
    eager: true,
  },
)
each(Object.entries(viteRequireContext), ([path, file]) => {
  const shortName = path.replace('./', '').replace('.ts', '').split('/')[1]
  modules[shortName] = file.default
})

export default modules
