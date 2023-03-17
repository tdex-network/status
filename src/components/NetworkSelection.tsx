import { Radio } from 'antd';
import React from 'react';

import { configProduction, configTestnet } from '../stores/config';
import { useSettingsStore } from '../stores/settingsStore';
import { useTdexStore } from '../stores/tdexStore';

const NetworkSelection: React.FC<any> = ({ style }) => {
  const setExplorerLiquidAPI = useSettingsStore((state) => state.setExplorerLiquidAPI);
  const refetchTdexProvidersAndMarkets = useTdexStore((state) => state.refetchTdexProvidersAndMarkets);
  const network = useSettingsStore((state) => state.network);
  const setNetwork = useSettingsStore((state) => state.setNetwork);

  return (
    <Radio.Group
      style={style}
      value={network}
      onChange={async (e) => {
        const chain = e.target.value;
        setExplorerLiquidAPI(
          chain === 'mainnet' ? configProduction.explorerLiquidAPI : configTestnet.explorerLiquidAPI
        );
        setNetwork(e.target.value);
        await refetchTdexProvidersAndMarkets();
      }}
    >
      <Radio.Button value="testnet">Testnet</Radio.Button>
      <Radio.Button value="liquid">Mainnet</Radio.Button>
    </Radio.Group>
  );
};

export default NetworkSelection;
