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
  subitems?: TNewItemData[]
};

export type TTag = {
  id: number;
  name: string;
  createdAt: number;
};

export type TNewTagData = Pick<TTag, "name">;

export type TPeriod = {
  id: number;
  createdAt: number;
};

export type TInterval = [start: number | null, end: number | null];

export enum NotificationStatuses {
  success,
  info,
  error
}

export type TNotification = {
  id: number;
  text: string;
  status: NotificationStatuses
}