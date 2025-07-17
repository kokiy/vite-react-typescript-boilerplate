import { each } from 'lodash-es'
import type { HttpHandler } from 'msw'

interface ModuleImportInterface {
  default: HttpHandler[]
}
const modules: Record<string, HttpHandler[]> = {}
const viteRequireContext = import.meta.glob<ModuleImportInterface>(
  './slices/*.ts',
  { eager: true },
)
each(
  Object.entries(viteRequireContext),
  ([path, file]: [string, ModuleImportInterface]) => {
    const shortName = path.replace('./', '').replace('.ts', '').split('/')[1]
    modules[shortName] = file.default
  },
)
export default modules
