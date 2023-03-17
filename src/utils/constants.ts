import type { Asset } from '../stores/assetStore';
import type { NetworkString } from '../types';

export const LBTC_TICKER: Record<NetworkString, 'LBTC' | 'tLBTC'> = {
  liquid: 'LBTC',
  testnet: 'tLBTC',
  regtest: 'LBTC',
};

export const LBTC_ASSET: Record<NetworkString, Asset> = {
  liquid: {
    ticker: LBTC_TICKER['liquid'],
    hash: '6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d',
    precision: 8,
    name: 'Liquid Bitcoin',
  },
  testnet: {
    ticker: LBTC_TICKER['testnet'],
    hash: '144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49',
    precision: 8,
    name: 'Testnet Liquid Bitcoin',
  },
  regtest: {
    ticker: LBTC_TICKER['regtest'],
    hash: '5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225',
    precision: 8,
    name: 'Liquid Bitcoin',
  },
};
