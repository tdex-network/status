import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';

import { Tdexv2ContentType } from '../../api-spec/openapi/swagger/v2/transport/data-contracts';
import type { GetMarketBalanceResponse, ListMarketsResponse } from '../../api-spec/protobuf/gen/js/tdex/v2/trade_pb';
import * as messages from '../../api-spec/protobuf/gen/js/tdex/v2/trade_pb';
import * as services from '../../api-spec/protobuf/gen/js/tdex/v2/trade_pb.client';
import type { Market } from '../../api-spec/protobuf/gen/js/tdex/v2/types_pb';
import * as types from '../../api-spec/protobuf/gen/js/tdex/v2/types_pb';
import { DEFAULT_TOR_PROXY } from '../../stores/config';

import { getClearTextTorProxyUrl } from './index';

interface TdexClientInterface {
  providerUrl: string;
  client: any;
  clientType: string;

  markets(): Promise<ListMarketsResponse['markets']>;

  balance({ baseAsset, quoteAsset }: Market): Promise<GetMarketBalanceResponse['balance']>;
}

export class TdexClient implements TdexClientInterface {
  providerUrl: string;
  client: services.ITradeServiceClient;
  clientType: string = Tdexv2ContentType.CONTENT_TYPE_GRPCWEBTEXT;

  constructor(providerUrl: string, torProxyEndpoint: string = DEFAULT_TOR_PROXY) {
    this.providerUrl = providerUrl;
    const url = new URL(providerUrl);
    // we assume we are in Liquid mainnet
    // TODO check if socks5 proxy is running (ie. Tor Browser)
    if (url.hostname.includes('onion') && !url.protocol.includes('https')) {
      // We use the HTTP1 cleartext endpoint here provided by the public tor reverse proxy
      // https://pkg.go.dev/github.com/tdex-network/tor-proxy@v0.0.3/pkg/torproxy#NewTorProxy
      //host:port/<just_onion_host_without_dot_onion>/[<grpc_package>.<grpc_service>/<grpc_method>]
      this.providerUrl = getClearTextTorProxyUrl(torProxyEndpoint, url);
    }
    this.client = new services.TradeServiceClient(new GrpcWebFetchTransport({ baseUrl: this.providerUrl }));
  }

  async markets(): Promise<ListMarketsResponse['markets']> {
    const call = await this.client.listMarkets(messages.ListMarketsRequest.create());
    return call.response.markets;
  }

  async balance({ baseAsset, quoteAsset }: types.Market): Promise<GetMarketBalanceResponse['balance']> {
    const market = types.Market.create({ baseAsset, quoteAsset });
    const request = messages.GetMarketBalanceRequest.create({ market });
    const call = await this.client.getMarketBalance(request);
    return call.response.balance;
  }
}
