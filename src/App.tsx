import { Col, Input, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';

import NetworkSelection from './components/NetworkSelection';
import type { TableRowData } from './components/Table';
import TableComponent from './components/Table';
import { useAssetStore } from './stores/assetStore';
import { useTdexStore } from './stores/tdexStore';
import { sats2Fractional, toFixed } from './utils/helpers';

const { Title } = Typography;

export const App = (): JSX.Element => {
  const fetchProviders = useTdexStore((s) => s.fetchProviders);
  const fetchMarkets = useTdexStore((s) => s.fetchMarkets);
  const fetchAssetData = useAssetStore((s) => s.fetchAssetData);
  const markets = useTdexStore((s) => s.markets);
  const assets = useAssetStore((s) => s.assets);

  const [tableData, setTableData] = useState<TableRowData[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  // Fetch and store providers and markets
  useEffect(() => {
    (async () => {
      await fetchProviders();
      await fetchMarkets();
    })();
  }, [fetchMarkets, fetchProviders]);

  // Fetch and store asset data for each market
  useEffect(() => {
    (async () => {
      for (const market of markets.v1) {
        await fetchAssetData(market.baseAsset);
        await fetchAssetData(market.quoteAsset);
      }
      for (const market of markets.v2) {
        await fetchAssetData(market.baseAsset);
        await fetchAssetData(market.quoteAsset);
      }
      const dataV1 = markets.v1.map((market, index) => ({
        key: `${market.provider.version}-${index}`,
        assetPair: `${assets[market.baseAsset]?.ticker}/${assets[market.quoteAsset]?.ticker}`,
        provider: {
          name: market.provider.name,
          endpoint: market.provider.endpoint,
        },
        baseAmount: toFixed(sats2Fractional(Number(market.baseAmount), assets[market.baseAsset]?.precision ?? 8)),
        quoteAmount: toFixed(sats2Fractional(Number(market.quoteAmount), assets[market.quoteAsset]?.precision ?? 8)),
        percentageFee: {
          baseAsset: undefined,
          quoteAsset: market.basisPoint ? toFixed(Number(market.basisPoint) / 100) : undefined,
        },
        fixedFee: {
          baseAsset: toFixed(sats2Fractional(Number(market.fixed?.baseFee), assets[market.baseAsset]?.precision ?? 8)),
          quoteAsset: toFixed(
            sats2Fractional(Number(market.fixed?.quoteFee), assets[market.quoteAsset]?.precision ?? 8)
          ),
        },
      }));
      const dataV2 = markets.v2.map((market, index) => ({
        key: `${market.provider.version}-${index}`,
        assetPair: `${assets[market.baseAsset]?.ticker}/${assets[market.quoteAsset]?.ticker}`,
        provider: {
          name: market.provider.name,
          endpoint: market.provider.endpoint,
        },
        baseAmount: toFixed(sats2Fractional(Number(market.baseAmount), assets[market.baseAsset]?.precision ?? 8)),
        quoteAmount: toFixed(sats2Fractional(Number(market.quoteAmount), assets[market.quoteAsset]?.precision ?? 8)),
        percentageFee: {
          baseAsset: market.percentageFee?.baseAsset
            ? toFixed(Number(market.percentageFee?.baseAsset) / 100)
            : undefined,
          quoteAsset: market.percentageFee?.quoteAsset
            ? toFixed(Number(market.percentageFee?.quoteAsset) / 100)
            : undefined,
        },
        fixedFee: {
          baseAsset: toFixed(
            sats2Fractional(Number(market.fixedFee?.baseAsset), assets[market.baseAsset]?.precision ?? 8)
          ),
          quoteAsset: toFixed(
            sats2Fractional(Number(market.fixedFee?.quoteAsset), assets[market.quoteAsset]?.precision ?? 8)
          ),
        },
      }));
      setTableData([...dataV1, ...dataV2]);
    })();
  }, [assets, fetchAssetData, markets]);

  return (
    <Col span={20} offset={2}>
      <Row justify="center" align="middle">
        <Col span={24}>
          <Title className="mb-10 d-flex justify-center bold" level={1}>
            TDEX MARKETS
          </Title>
          <NetworkSelection
            style={{
              position: 'absolute',
              right: 0,
              top: '5%',
            }}
          />
        </Col>
      </Row>

      <Input.Search
        className="mb-4"
        onSearch={(value) => setSearchText(value)}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search"
        size="large"
      />
      <TableComponent data={tableData} searchText={searchText} />
    </Col>
  );
};

export default App;
