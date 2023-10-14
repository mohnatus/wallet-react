import { TInterval, TPeriod } from "../types";
import { formatDate } from "./date";

export function getInterval(
  period1: TPeriod | null | undefined,
  period2: TPeriod | null | undefined
): TInterval {
  return [period1?.createdAt || null, period2?.createdAt || null] as TInterval;
}

export function formatInterval([period1, period2]: TInterval, start?: number) {
  const fromMoment = period1 || start;
  const from = fromMoment ? formatDate(fromMoment) : "...";
  const to = period2 ? formatDate(period2) : "...";

  return `${from}-${to}`;
}

