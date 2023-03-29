import type { NetworkString } from '../types';

import { LBTC_ASSET } from './constants';

export function isLbtc(asset: string, network: NetworkString): boolean {
  return asset === LBTC_ASSET[network]?.hash;
}

export function sats2Fractional(sats: number, precision: number): number | undefined {
  // Check that sats is not a float
  if (Number(sats) === sats && sats % 1 !== 0) {
    throw new Error('Amount should be specified in satoshis');
  }
  try {
    return sats / 10 ** precision;
  } catch (err) {
    console.error(err);
  }
}

export function toFixed(num?: number): string | undefined {
  return num?.toFixed(8).replace(/\.?0+$/, '');
}
