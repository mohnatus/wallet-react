export type TItem = {
  id: number;
  text: string;
  price: number;
  tag: number;
  createdAt: number;
  subitems?: TItem[];
};

export type TNewItemData = {
  text: string;
  price: number;
  tag: number;
  subitems?: TNewItemData[];
};

export type TTag = {
  id: number;
  name: string;
  createdAt: number;
  limit?: number;
};

export type TNewTagData = Pick<TTag, "name" | "limit">;

export type TPeriod = {
  id: number;
  createdAt: number | null;
  name: string;
};

export type TNewPeriodData = Pick<TPeriod, "name">;

export type TInterval = [start: number | null, end: number | null];

export enum NotificationStatuses {
  success,
  info,
  error,
}

export type TNotification = {
  id: number;
  text: string;
  status: NotificationStatuses;
};

export type TStatsItem = {
  id: number;
  text: string;
  total: number;
  createdAt: number;
};

export type TTagStats = TStatsItem[];

export type TStats = Record<number, TTagStats>;
