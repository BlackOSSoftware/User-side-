export type SignalItem = {
  _id: string;
  symbol?: string;
  segment?: string;
  status?: string;
  type?: string;
  timeframe?: string;
  entry?: number;
  stopLoss?: number;
  targets?: number[];
  createdAt?: string;
};

export type SignalListResponse = {
  results?: SignalItem[];
  pagination?: {
    page?: number;
    limit?: number;
    totalPages?: number;
    totalResults?: number;
  };
  stats?: Record<string, unknown>;
};

export type SignalAnalysisResponse = Record<string, unknown>;
