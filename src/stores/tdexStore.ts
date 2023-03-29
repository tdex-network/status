import axios from 'axios';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { getMarketsFromProviderV1, getMarketsFromProviderV2 } from '../services/tdexService';
import type { TDEXMarketV1, TDEXMarketV2, TDEXProvider, TDEXProviderWithVersion } from '../types';

import { DEFAULT_TOR_PROXY, TDEX_REGISTRY_MAINNET, TDEX_REGISTRY_TESTNET } from './config';
import { useSettingsStore } from './settingsStore';

interface TdexState {
  providers: TDEXProviderWithVersion[];
  markets: { v1: TDEXMarketV1[]; v2: TDEXMarketV2[] };
}

export interface TdexActions {
  addProviders: (providers: TDEXProviderWithVersion[]) => void;
  clearMarkets: () => void;
  clearProviders: () => void;
  deleteProvider: (provider: TDEXProvider) => void;
  fetchMarkets: () => Promise<void>;
  fetchProviders: () => Promise<void>;
  getProtoVersion: (providerEndpoint: string) => Promise<'v1' | 'v2'>;
  refetchTdexProvidersAndMarkets: () => Promise<void>;
  resetTdexStore: () => void;
}

const initialState: TdexState = {
  providers: [],
  markets: { v1: [], v2: [] },
};

export const useTdexStore = create<TdexState & TdexActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        addProviders: (providers) => {
          set(
            (state) => {
              const newProviders: TDEXProviderWithVersion[] = [];
              providers.forEach((p) => {
                const isProviderInState = state.providers.some(({ endpoint }) => endpoint === p.endpoint);
                if (!isProviderInState) newProviders.push(p);
              });
              return { providers: [...state.providers, ...newProviders] };
            },
            false,
            'addProviders'
          );
        },
        clearMarkets: () => set({ markets: { v1: [], v2: [] } }, false, 'clearMarkets'),
        clearProviders: () => set({ providers: [] }, false, 'clearProviders'),
        deleteProvider: (provider: TDEXProvider) => {
          set(
            (state) => ({ providers: state.providers.filter((p) => p.endpoint !== provider.endpoint) }),
            false,
            'deleteProvider'
          );
        },
        fetchMarkets: async () => {
          const marketsV1ToAdd: TDEXMarketV1[] = [];
          const marketsV2ToAdd: TDEXMarketV2[] = [];
          const allMarkets = await Promise.allSettled(
            get().providers.map((p) => {
              if (p.version === 'v1') {
                return getMarketsFromProviderV1(p, DEFAULT_TOR_PROXY);
              } else {
                return getMarketsFromProviderV2(p, DEFAULT_TOR_PROXY);
              }
            })
          );
          allMarkets
            .map((promise) => (promise.status === 'fulfilled' && promise.value ? promise.value : []))
            .forEach((markets) => {
              if (markets.length > 0) {
                // Check if markets are already in state
                if (markets[0].provider.version === 'v1') {
                  marketsV1ToAdd.push(...(markets as TDEXMarketV1[]));
                } else {
                  marketsV2ToAdd.push(...(markets as TDEXMarketV2[]));
                }
              }
            });
          set(
            (state) => ({
              markets: {
                v1: marketsV1ToAdd,
                v2: marketsV2ToAdd,
              },
            }),
            false,
            'fetchMarkets'
          );
        },
        fetchProviders: async () => {
          const network = useSettingsStore.getState().network;
          const providers: TDEXProviderWithVersion[] = [];
          if (network === 'liquid') {
            const providersFromRegistry: TDEXProvider[] = (await axios.get(TDEX_REGISTRY_MAINNET)).data;
            for (const provider of providersFromRegistry) {
              const version = await get().getProtoVersion(provider.endpoint);
              providers.push({ ...provider, version });
            }
            get().addProviders(providers);
          } else if (network === 'testnet') {
            const providersFromRegistry = (await axios.get(TDEX_REGISTRY_TESTNET)).data;
            // TODO: remove this when the registry will be updated
            providersFromRegistry.push({
              name: 'v1.provider.tdex.network',
              endpoint: 'https://v1.provider.tdex.network',
            });
            for (const provider of providersFromRegistry) {
              const version = await get().getProtoVersion(provider.endpoint);
              providers.push({ ...provider, version });
            }
            get().addProviders(providers);
          }
        },
        getProtoVersion: async (providerEndpoint) => {
          try {
            const res = await axios.post(`${providerEndpoint}/v1/info`, { list_services: '' });
            const isVersion2 = res.data.result.listServicesResponse.service
              .map((s: any) => s.name)
              .includes('tdex.v2.TransportService');
            return isVersion2 ? 'v2' : 'v1';
          } catch (err) {
            return 'v1';
          }
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
