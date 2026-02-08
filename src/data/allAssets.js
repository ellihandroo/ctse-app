import { equities } from './equities'
import { tokenizedAssets } from './tokenizedAssets'
import { crypto } from './crypto'
import { predictions } from './predictions'
import { perpetuals } from './perpetuals'

const allAssets = [
  ...equities,
  ...tokenizedAssets,
  ...crypto,
  ...predictions,
  ...perpetuals,
]

export function findAssetById(id) {
  return allAssets.find((a) => a.id === id) || null
}

export default allAssets
