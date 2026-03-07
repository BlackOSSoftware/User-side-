const BASE_KEYWORDS = [
  "trading signals",
  "live trading signals",
  "best trading signals",
  "accurate trading signals",
  "real time signals",
  "intraday signals",
  "swing signals",
  "positional signals",
  "scalping signals",
  "risk managed signals",
  "entry stop loss targets",
  "high probability signals",
  "verified signals",
  "premium signals",
  "professional trading signals",
  "algorithmic signals",
  "price action signals",
  "technical analysis signals",
  "market structure signals",
  "trend signals",
  "breakout signals",
  "reversal signals",
  "momentum signals",
  "volatility signals",
  "volume based signals",
  "smart money signals",
  "liquidity signals",
  "trade alerts",
  "trade ideas",
  "market insights",
  "trade setups",
  "execution ready signals",
  "institutional grade signals",
  "low latency signals",
  "disciplined trading signals",
  "transparent trading signals",
  "signal service",
  "trading signal provider",
  "trading view signals",
  "chart based signals",
  "live chart signals",
  "strategy signals",
  "strategy alerts",
  "signal desk",
  "signal room",
  "trader signals",
  "day trading signals",
  "short term signals",
  "long term signals",
  "signal subscription",
  "market signal service",
  "signal analytics",
  "trading performance",
  "risk framework",
  "professional traders",
  "trading discipline",
  "trade execution",
  "signal accuracy",
  "signal reliability",
  "trusted signals",
  "paid signals",
  "subscription signals",
  "price alerts",
  "market alerts",
  "strategy framework",
  "signal community",
  "market timing",
  "signal notification",
];

const MARKETS = [
  "forex",
  "fx",
  "currency",
  "commodities",
  "comex",
  "mcx",
  "gold",
  "silver",
  "crude oil",
  "natural gas",
  "metals",
  "energy",
  "indices",
  "index",
  "nifty",
  "bank nifty",
  "sensex",
  "dow jones",
  "nasdaq",
  "s&p 500",
  "equity",
  "stocks",
  "stock market",
  "options",
  "futures",
  "derivatives",
  "crypto",
  "bitcoin",
  "ethereum",
  "altcoins",
  "usdinr",
  "gbpinr",
  "eurinr",
  "usdjpy",
  "eurusd",
  "gbpusd",
  "audusd",
  "usdcad",
  "usdx",
  "xauusd",
  "xagusd",
];

const REGIONS = [
  "india",
  "indian",
  "us",
  "usa",
  "uk",
  "europe",
  "asia",
  "global",
  "middle east",
  "singapore",
  "dubai",
];

const INTENTS = [
  "signals",
  "live signals",
  "trading signals",
  "buy sell signals",
  "entry signals",
  "exit signals",
  "signal service",
  "signal provider",
  "signal alerts",
  "trade alerts",
  "trade ideas",
  "trade setups",
  "strategies",
  "analysis",
  "chart signals",
  "intraday signals",
  "swing signals",
  "scalping signals",
  "positional signals",
  "trend signals",
  "breakout signals",
  "reversal signals",
  "momentum signals",
  "options signals",
  "futures signals",
  "market signals",
  "premium signals",
];

const QUALIFIERS = [
  "best",
  "accurate",
  "verified",
  "professional",
  "trusted",
  "reliable",
  "live",
  "real time",
  "institutional",
  "low latency",
  "high probability",
  "risk managed",
  "execution ready",
  "transparent",
  "disciplined",
  "strategy based",
  "chart based",
  "performance focused",
  "signal room",
];

const TIMEFRAMES = [
  "today",
  "daily",
  "weekly",
  "monthly",
  "short term",
  "long term",
  "intraday",
  "swing",
  "positional",
  "scalping",
];

const TARGET_KEYWORDS = 1000;

const PAGE_PHRASES = [
  "trading signals",
  "live signals",
  "signal service",
  "signal provider",
  "signal desk",
  "signal room",
  "trade alerts",
  "trade ideas",
  "market signals",
  "market updates",
  "strategy signals",
  "execution signals",
  "risk managed signals",
  "trade setups",
  "trade entries",
];

function pushUnique(target: string[], seen: Set<string>, value: string) {
  const normalized = value.trim().toLowerCase();
  if (!normalized || seen.has(normalized)) return;
  seen.add(normalized);
  target.push(value);
}

function buildKeywordSet(extra: string[] = []) {
  const result: string[] = [];
  const seen = new Set<string>();

  BASE_KEYWORDS.forEach((k) => pushUnique(result, seen, k));
  extra.forEach((k) => pushUnique(result, seen, k));

  for (const market of MARKETS) {
    for (const intent of INTENTS) {
      pushUnique(result, seen, `${market} ${intent}`);
      pushUnique(result, seen, `${intent} ${market}`);
    }
  }

  for (const region of REGIONS) {
    for (const market of MARKETS) {
      pushUnique(result, seen, `${region} ${market} signals`);
      pushUnique(result, seen, `${market} signals ${region}`);
      for (const qualifier of QUALIFIERS) {
        pushUnique(result, seen, `${qualifier} ${region} ${market} signals`);
      }
    }
  }

  for (const market of MARKETS) {
    for (const qualifier of QUALIFIERS) {
      pushUnique(result, seen, `${qualifier} ${market} signals`);
    }
    for (const timeframe of TIMEFRAMES) {
      pushUnique(result, seen, `${timeframe} ${market} signals`);
    }
  }

  for (const qualifier of QUALIFIERS) {
    for (const intent of INTENTS) {
      pushUnique(result, seen, `${qualifier} ${intent}`);
    }
  }

  while (result.length < TARGET_KEYWORDS) {
    const idx = result.length % MARKETS.length;
    const market = MARKETS[idx];
    const qualifier = QUALIFIERS[result.length % QUALIFIERS.length];
    const timeframe = TIMEFRAMES[result.length % TIMEFRAMES.length];
    pushUnique(result, seen, `${qualifier} ${market} ${timeframe} signals`);
  }

  return result.slice(0, TARGET_KEYWORDS);
}

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function rotateList<T>(list: T[], offset: number) {
  if (!list.length) return list;
  const shift = offset % list.length;
  return list.slice(shift).concat(list.slice(0, shift));
}

export function getSeoKeywords(extra: string[] = []) {
  return buildKeywordSet(extra);
}

export function getSeoKeywordsForPage(pageKey: string, extra: string[] = []) {
  const base = buildKeywordSet(extra);
  const result: string[] = [];
  const seen = new Set<string>();

  const key = pageKey.trim().toLowerCase();
  const pageExtras = PAGE_PHRASES.map((phrase) => `${key} ${phrase}`);
  pageExtras.forEach((k) => pushUnique(result, seen, k));

  const rotated = rotateList(base, hashString(key));
  rotated.forEach((k) => pushUnique(result, seen, k));

  while (result.length < TARGET_KEYWORDS) {
    const idx = result.length % base.length;
    pushUnique(result, seen, `${key} ${base[idx]}`);
  }

  return result.slice(0, TARGET_KEYWORDS);
}
