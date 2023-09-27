import { getStore } from "./utils";
import { notify, notifyError } from "../utils/notifier";
import { ITEMS_STORE_NAME } from "./constants";
import { TItem } from "../types";

export function addItemToDb(item: TItem) {
  const items = getStore(ITEMS_STORE_NAME, true);
  let request = items.add(item);
  request.onsuccess = function () {
    notify("Запись успешно сохранена");
  };
  request.onerror = function () {
    notifyError("Не удалось сохранить запись", request.error);
  };
}

export function removeItemFromDb(item: TItem) {
  let items = getStore(ITEMS_STORE_NAME, true);
  let request = items.delete(item.id);
  request.onsuccess = function () {
    notify("Запись успешно удалена");
  };
  request.onerror = function () {
    notifyError("Не удалось удалить запись", request.error);
  };
}
