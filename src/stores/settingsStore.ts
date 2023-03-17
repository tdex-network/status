import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { NetworkString } from '../types';

import { config } from './config';

export interface SettingsState {
  explorerLiquidAPI: string;
  network: NetworkString;
}

interface SettingsActions {
  setExplorerLiquidAPI: (explorerLiquidAPI: string) => void;
  setNetwork: (network: NetworkString) => void;
  resetSettingsStore: () => void;
}

const initialState: SettingsState = {
  explorerLiquidAPI: config.explorerLiquidAPI,
  network: config.network,
};

export const useSettingsStore = create<SettingsState & SettingsActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setExplorerLiquidAPI: (explorerLiquidAPI) => set({ explorerLiquidAPI }, false, 'setExplorerLiquidAPI'),
        setNetwork: (network) => set({ network }, false, 'setNetwork'),
        resetSettingsStore: () => set(initialState, false, 'resetSettingsStore'),
      }),
      { name: 'settings' }
    ),
    { name: 'store', store: 'settings' }
  )
);
