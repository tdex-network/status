import type { NetworkString } from '../types';

import { LBTC_ASSET } from './constants';

export function isLbtc(asset: string, network: NetworkString): boolean {
  return asset === LBTC_ASSET[network]?.hash;
}
