export type NetworkString = 'liquid' | 'testnet' | 'regtest';

export interface TDEXProvider {
  name: string;
  endpoint: string;
}

export interface TDEXProviderWithVersion extends TDEXProvider {
  version: 'v1' | 'v2';
}

export interface TDEXMarketV1 {
  provider: TDEXProviderWithVersion;
  baseAsset: string;
  baseAmount?: string;
  quoteAsset: string;
  quoteAmount?: string;
  basisPoint?: string;
  fixed?: {
    baseFee: string;
    quoteFee: string;
  };
}

export interface TDEXMarketV2 {
  provider: TDEXProviderWithVersion;
  baseAsset: string;
  baseAmount?: string;
  quoteAsset: string;
  quoteAmount?: string;
  percentageFee?: { baseAsset: string; quoteAsset: string };
  fixedFee?: { baseAsset: string; quoteAsset: string };
}
