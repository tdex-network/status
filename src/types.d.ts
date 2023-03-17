export type NetworkString = 'liquid' | 'testnet' | 'regtest';

export interface TDEXProvider {
  name: string;
  endpoint: string;
}

export interface TDEXMarket {
  baseAsset: string;
  quoteAsset: string;
  basisPoint?: string;
  fixed?: {
    baseFee: string;
    quoteFee: string;
  };
  provider: TDEXProvider;
  baseAmount?: string;
  quoteAmount?: string;
}
