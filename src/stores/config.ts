/* Used only to initialize store */

import type { NetworkString } from '../types';

// eslint-disable-next-line import/no-mutable-exports
let config: {
  network: NetworkString;
  explorerLiquidAPI: string;
};

const DEFAULT_TOR_PROXY = 'https://proxy.tdex.network';
const TDEX_REGISTRY_MAINNET = 'https://raw.githubusercontent.com/tdex-network/tdex-registry/master/registry.json';
const TDEX_REGISTRY_TESTNET = 'https://raw.githubusercontent.com/tdex-network/tdex-registry/testnet/registry.json';

const blockstreamExplorerEndpoints = {
  liquid: {
    explorerLiquidAPI: 'https://blockstream.info/liquid/api',
  },
  testnet: {
    explorerLiquidAPI: 'https://blockstream.info/liquidtestnet/api',
  },
};

const mempoolExplorerEndpoints = {
  liquid: {
    explorerLiquidAPI: 'https://liquid.network/api',
  },
  testnet: {
    explorerLiquidAPI: 'https://liquid.network/liquidtestnet/api',
  },
};

const configProduction: typeof config = {
  network: 'liquid',
  explorerLiquidAPI: mempoolExplorerEndpoints.liquid.explorerLiquidAPI,
};

const configTestnet: typeof config = {
  network: 'testnet',
  explorerLiquidAPI: mempoolExplorerEndpoints.testnet.explorerLiquidAPI,
};

if (process.env.REACT_APP_CHAIN === 'testnet') {
  config = configTestnet;
} else {
  config = configProduction;
}

export {
  blockstreamExplorerEndpoints,
  config,
  configTestnet,
  configProduction,
  DEFAULT_TOR_PROXY,
  mempoolExplorerEndpoints,
  TDEX_REGISTRY_MAINNET,
  TDEX_REGISTRY_TESTNET,
};
