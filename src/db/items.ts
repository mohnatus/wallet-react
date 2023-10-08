import { getStore } from "./utils";
import { notify, notifyError } from "../utils/notifier";
import { ITEMS_STORE_NAME } from "./constants";
import { TItem } from "../types";

export function addItemToDb(item: TItem): Promise<void> {
  return new Promise((resolve, reject) => {
    const items = getStore(ITEMS_STORE_NAME, true);
    let request = items.add(item);
    request.onsuccess = function () {
      resolve();
    };
    request.onerror = function () {
      reject(request.error);
    };
  });
}

export async function updateItemInDb(item: TItem): Promise<void> {
  return new Promise((resolve, reject) => {
    const items = getStore(ITEMS_STORE_NAME, true);
    let request = items.put(item);
    request.onsuccess = function () {
      resolve();
    };
    request.onerror = function () {
      reject(request.error);
    };
  });
}

export function removeItemFromDb(item: TItem): Promise<void> {
  return new Promise((resolve, reject) => {
    let items = getStore(ITEMS_STORE_NAME, true);
    let request = items.delete(item.id);
    request.onsuccess = function () {
      resolve();
    };
    request.onerror = function () {
      reject(request.error);
    };
  });
}
