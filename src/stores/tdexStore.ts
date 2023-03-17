import axios from 'axios';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { getMarketsFromProviderV1 } from '../services/tdexService';
import type { TDEXMarket, TDEXProvider } from '../types';

import { DEFAULT_TOR_PROXY, REGTEST_PROVIDER, TDEX_REGISTRY_MAINNET, TDEX_REGISTRY_TESTNET } from './config';
import { useSettingsStore } from './settingsStore';

interface TdexState {
  providers: TDEXProvider[];
  markets: TDEXMarket[];
}

export interface TdexActions {
  addProviders: (providers: TDEXProvider[]) => void;
  clearMarkets: () => void;
  clearProviders: () => void;
  deleteProvider: (provider: TDEXProvider) => void;
  fetchMarkets: () => Promise<void>;
  fetchProviders: () => Promise<void>;
  refetchTdexProvidersAndMarkets: () => Promise<void>;
  replaceMarketsOfProvider: (providerToUpdate: TDEXProvider, markets: TDEXMarket[]) => void;
  resetTdexStore: () => void;
}

const initialState: TdexState = {
  providers: [],
  markets: [],
};

export const useTdexStore = create<TdexState & TdexActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        addProviders: (providers: TDEXProvider[]) => {
          set(
            (state) => {
              const newProviders: TDEXProvider[] = [];
              providers.forEach((p: TDEXProvider) => {
                const isProviderInState = state.providers.some(({ endpoint }) => endpoint === p.endpoint);
                if (!isProviderInState) newProviders.push(p);
              });
              return { providers: [...state.providers, ...newProviders] };
            },
            false,
            'addProviders'
          );
        },
        clearMarkets: () => set({ markets: [] }, false, 'clearMarkets'),
        clearProviders: () => set({ providers: [] }, false, 'clearProviders'),
        deleteProvider: (provider: TDEXProvider) => {
          set(
            (state) => ({ providers: state.providers.filter((p) => p.endpoint !== provider.endpoint) }),
            false,
            'deleteProvider'
          );
        },
        fetchMarkets: async () => {
          let marketsToAdd: TDEXMarket[];
          const allMarkets = await Promise.allSettled(
            get().providers.map((p) => {
              // TODO: Check provider proto version and use appropriate OperatorServiceClient
              return getMarketsFromProviderV1(p, DEFAULT_TOR_PROXY);
              // return getMarketsFromProviderV2(p, torProxy)
            })
          );
          allMarkets
            .map((promise) => (promise.status === 'fulfilled' && promise.value ? promise.value : []))
            .forEach((markets) => {
              // Check if markets are already in state
              marketsToAdd = markets.filter((market) => {
                const isMarketInState = get().markets.some(
                  (m) =>
                    m.baseAsset === market.baseAsset &&
                    m.quoteAsset === market.quoteAsset &&
                    m.provider.endpoint === market.provider.endpoint &&
                    m.basisPoint === market.basisPoint &&
                    m.fixed?.baseFee === market.fixed?.baseFee &&
                    m.fixed?.quoteFee === market.fixed?.quoteFee
                );
                return !isMarketInState;
              });
              set((state) => ({ markets: [...state.markets, ...marketsToAdd] }), false, 'fetchMarkets');
            });
        },
        fetchProviders: async () => {
          const network = useSettingsStore.getState().network;
          if (network === 'liquid') {
            const providersFromRegistry = (await axios.get(TDEX_REGISTRY_MAINNET)).data;
            get().addProviders(providersFromRegistry);
          } else if (network === 'testnet') {
            const providersFromRegistry = (await axios.get(TDEX_REGISTRY_TESTNET)).data;
            // TODO: remove this when the registry will be updated
            providersFromRegistry.push({
              name: 'v1.provider.tdex.network',
              endpoint: 'https://v1.provider.tdex.network/',
            });
            get().addProviders(providersFromRegistry);
          } else {
            get().addProviders([{ endpoint: REGTEST_PROVIDER, name: 'Regtest provider' }]);
          }
        },
        replaceMarketsOfProvider: (providerToUpdate: TDEXProvider, markets: TDEXMarket[]) => {
          set(
            (state) => {
              // Remove markets of provider received in arg
              const marketsWithoutProviderToUpdate = state.markets.filter(
                (market) => market.provider.endpoint !== (providerToUpdate as TDEXProvider).endpoint
              );
              return { ...state, markets: [...marketsWithoutProviderToUpdate, ...markets] };
            },
            false,
            'replaceMarketsOfProvider'
          );
        },
        refetchTdexProvidersAndMarkets: async () => {
          try {
            await get().clearProviders();
            await get().clearMarkets();
            await get().fetchProviders();
            await get().fetchMarkets();
          } catch {
            console.error('Unable to fetch providers and markets');
          }
        },
        resetTdexStore: () => set(initialState, false, 'resetTdexStore'),
      }),
      { name: 'tdex' }
    ),
    { name: 'store', store: 'tdex' }
  )
);
