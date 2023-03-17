/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  RpcStatus,
  Tdexv2CompleteTradeRequest,
  Tdexv2CompleteTradeResponse,
  Tdexv2GetMarketBalanceRequest,
  Tdexv2GetMarketBalanceResponse,
  Tdexv2GetMarketPriceRequest,
  Tdexv2GetMarketPriceResponse,
  Tdexv2ListMarketsResponse,
  Tdexv2PreviewTradeRequest,
  Tdexv2PreviewTradeResponse,
  Tdexv2ProposeTradeRequest,
  Tdexv2ProposeTradeResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class V2<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
 * No description
 *
 * @tags TradeService
 * @name TradeServiceGetMarketBalance
 * @summary GetMarketBalance retutns the balance of the two current reserves of the
given market.
 * @request POST:/v2/market/balance
 */
  tradeServiceGetMarketBalance = (body: Tdexv2GetMarketBalanceRequest, params: RequestParams = {}) =>
    this.request<Tdexv2GetMarketBalanceResponse, RpcStatus>({
      path: `/v2/market/balance`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
 * No description
 *
 * @tags TradeService
 * @name TradeServiceGetMarketPrice
 * @summary GetMarketPrice retutns the spot price for the requested market and its
minimum tradable amount of base asset.
 * @request POST:/v2/market/price
 */
  tradeServiceGetMarketPrice = (body: Tdexv2GetMarketPriceRequest, params: RequestParams = {}) =>
    this.request<Tdexv2GetMarketPriceResponse, RpcStatus>({
      path: `/v2/market/price`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags TradeService
   * @name TradeServiceListMarkets
   * @summary ListMarkets lists all the markets open for trading.
   * @request POST:/v2/markets
   */
  tradeServiceListMarkets = (params: RequestParams = {}) =>
    this.request<Tdexv2ListMarketsResponse, RpcStatus>({
      path: `/v2/markets`,
      method: 'POST',
      format: 'json',
      ...params,
    });
  /**
 * No description
 *
 * @tags TradeService
 * @name TradeServiceCompleteTrade
 * @summary CompleteTrade can be used by the trader to let the daemon finalizing,
extracting, and broadcasting the swap transaction, once he's signed his
inputs.
This is not mandatory, the trader can do the steps above on his own
alternatively.
 * @request POST:/v2/trade/complete
 */
  tradeServiceCompleteTrade = (body: Tdexv2CompleteTradeRequest, params: RequestParams = {}) =>
    this.request<Tdexv2CompleteTradeResponse, RpcStatus>({
      path: `/v2/trade/complete`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
 * @description The trade type can assume values BUY or SELL and it always refer to the fixed base asset. For example: * if trade type is BUY, it means the trader wants to buy base asset funds. * if trade type is SELL, it means the trader wants to sell base asset funds.
 *
 * @tags TradeService
 * @name TradeServicePreviewTrade
 * @summary PreviewTrade returns a counter amount and asset in response to the
provided ones and a trade type for a market.
 * @request POST:/v2/trade/preview
 */
  tradeServicePreviewTrade = (body: Tdexv2PreviewTradeRequest, params: RequestParams = {}) =>
    this.request<Tdexv2PreviewTradeResponse, RpcStatus>({
      path: `/v2/trade/preview`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
 * No description
 *
 * @tags TradeService
 * @name TradeServiceProposeTrade
 * @summary ProposeTrade allows a trader to present a SwapRequest. The service answers
with a SwapAccept, filling the request's partial transaction, + an
expiration time to complete the swap when accepting the swap, or,
otherwise, with a SwapFail containg the reason for the rejection of the
proposal.
 * @request POST:/v2/trade/propose
 */
  tradeServiceProposeTrade = (body: Tdexv2ProposeTradeRequest, params: RequestParams = {}) =>
    this.request<Tdexv2ProposeTradeResponse, RpcStatus>({
      path: `/v2/trade/propose`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
