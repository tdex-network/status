import axios from 'axios';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { LBTC_ASSET } from '../utils/constants';
import { isLbtc } from '../utils/helpers';

import { useSettingsStore } from './settingsStore';

export interface Asset {
  hash: string;
  name?: string;
  precision?: number;
  ticker: string;
}

export interface AssetState {
  assets: Record<string, Asset>;
}

interface AssetActions {
  addAsset: (asset: Asset) => void;
  fetchAssetData: (assetHash: string) => Promise<void>;
  resetAssetStore: () => void;
}

export const useAssetStore = create<AssetState & AssetActions>()(
  devtools(
    persist(
      (set, get) => ({
        assets: {},
        addAsset: (asset: Asset) => {
          set((state) => ({ assets: { ...state.assets, [asset.hash]: asset } }), false, 'addAsset');
        },
        fetchAssetData: async (assetHash: string) => {
          const network = useSettingsStore.getState().network;
          if (get().assets[assetHash]?.hash) return;
          // Set LBTC from constant because explorer doesn't return ticker
          if (isLbtc(assetHash, network)) {
            set(
              (state) => ({ assets: { ...state.assets, [assetHash]: LBTC_ASSET[network] } }),
              false,
              'fetchAssetData/lbtc'
            );
            return;
          }
          let precision, ticker, name;
          try {
            const res = (await axios.get(`${useSettingsStore.getState().explorerLiquidAPI}/asset/${assetHash}`)).data;
            precision = res.precision;
            ticker = res.ticker;
            name = res.name;
          } catch (err) {
            console.error(err);
          } finally {
            const assetData = {
              hash: assetHash,
              precision: precision ?? 8,
              ticker: ticker || assetHash.slice(0, 4).toUpperCase(),
              name: name ?? 'Unknown',
            };
            set((state) => ({ assets: { ...state.assets, [assetHash]: assetData } }), false, 'fetchAssetData');
          }
        },
        resetAssetStore: () => set({ assets: {} }, false, 'resetAssetStore'),
      }),
      { name: 'asset' }
    ),
    { name: 'store', store: 'asset' }
  )
);
