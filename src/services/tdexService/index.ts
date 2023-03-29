import { DEFAULT_TOR_PROXY } from '../../stores/config';
import type { TDEXMarketV1, TDEXMarketV2, TDEXProviderWithVersion } from '../../types';

import { TdexClient as TdexClientV1 } from './client-v1';
import { TdexClient as TdexClientV2 } from './client-v2';

export async function getMarketsFromProviderV1(
  p: TDEXProviderWithVersion,
  torProxy = DEFAULT_TOR_PROXY
): Promise<TDEXMarketV1[]> {
  const client = new TdexClientV1(p.endpoint, torProxy);
  const markets = await client.markets();
  const results: TDEXMarketV1[] = [];
  for (const { market, fee } of markets) {
    if (!market) continue;
    const balance = (await client.balance(market))?.balance;
    results.push({
      provider: p,
      ...market,
      ...balance,
      ...fee,
    });
  }
  return results;
}

export async function getMarketsFromProviderV2(
  p: TDEXProviderWithVersion,
  torProxy = DEFAULT_TOR_PROXY
): Promise<TDEXMarketV2[]> {
  const client = new TdexClientV2(p.endpoint, torProxy);
  const markets = await client.markets();
  const results: TDEXMarketV2[] = [];
  for (const { market, fee } of markets) {
    if (!market) continue;
    const balance = await client.balance(market);
    results.push({
      provider: p,
      ...market,
      ...balance,
      ...fee,
    });
  }
  return results;
}

export function getClearTextTorProxyUrl(torProxyEndpoint: string, url: URL): string {
  // get just_onion_host_without_dot_onion
  const splitted = url.hostname.split('.');
  splitted.pop();
  const onionPubKey = splitted.join('.');
  return `${torProxyEndpoint}/${onionPubKey}`;
}
