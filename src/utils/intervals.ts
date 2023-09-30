import { TInterval, TPeriod } from "../types";
import { formatDate } from "./date";

export function getInterval(
  period1: TPeriod | null | undefined,
  period2: TPeriod | null | undefined
): TInterval {
  return [period1?.createdAt || null, period2?.createdAt || null];
}

export function formatInterval([period1, period2]: TInterval) {
  const from = period1 ? formatDate(period1) : "...";
  const to = period2 ? formatDate(period2) : "...";

  return `${from}-${to}`;
}
