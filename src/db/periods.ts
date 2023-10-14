import { getStore } from "./utils";
import { notify, notifyError } from "../utils/notifier";
import { PERIODS_STORE_NAME } from "./constants";
import { TPeriod } from "../types";

export function addPeriodToDb(period: TPeriod) {
  const periods = getStore(PERIODS_STORE_NAME, true);
  let request = periods.add(period);
  request.onsuccess = function () {
    notify("Запись успешно сохранена");
  };
  request.onerror = function () {
    notifyError("Не удалось сохранить запись", request.error);
  };
}

export async function updatePeriodInDb(item: TPeriod): Promise<void> {
  return new Promise((resolve, reject) => {
    const tags = getStore(PERIODS_STORE_NAME, true);
    let request = tags.put(item);
    request.onsuccess = function () {
      resolve();
    };
    request.onerror = function () {
      reject(request.error);
    };
  });
}

export function removePeriodFromDb(period: TPeriod) {
  let periods = getStore(PERIODS_STORE_NAME, true);
  let request = periods.delete(period.id);
  request.onsuccess = function () {
    notify("Запись успешно удалена");
  };
  request.onerror = function () {
    notifyError("Не удалось удалить запись", request.error);
  };
}
