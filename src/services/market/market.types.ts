export type MarketSegment = {
  segment?: string;
  name?: string;
};

export type MarketSymbol = {
  _id?: string;
  symbol?: string;
  name?: string;
  segment?: string;
  exchange?: string;
  price?: number;
  change?: number;
};

export type MarketTicker = {
  symbol: string;
  name?: string;
  segment?: string;
  exchange?: string;
  price?: number;
  prevClose?: number;
  change?: number;
  isUp?: boolean;
  lotSize?: number;
  color?: string;
};

export type MarketStats = Record<string, unknown>;
export type MarketTickers = MarketTicker[];
export type MarketSentiment = Record<string, unknown>;
export type MarketAnalysis = Record<string, unknown>;
export type MarketNews = Record<string, unknown>;

export type MarketLoginUrlResponse = {
  url?: string;
} & Record<string, unknown>;
