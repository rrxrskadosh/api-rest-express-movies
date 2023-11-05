import { createRequire } from 'node:module'

// Creating require to reading file json
const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)
