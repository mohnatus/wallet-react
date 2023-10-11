import { TTag } from "../types";
import { notify, notifyError } from "../utils/notifier";
import { TAGS_STORE_NAME } from "./constants";
import { getStore } from "./utils";

export function addTagToDb(tag: TTag) {
  let tags = getStore(TAGS_STORE_NAME, true);
  let request = tags.add(tag);
  request.onsuccess = function () {
    notify("Запись успешно сохранена");
  };
  request.onerror = function () {
    notifyError("Не удалось сохранить запись", request.error);
  };
}

export async function updateTagInDb(item: TTag): Promise<void> {
  return new Promise((resolve, reject) => {
    const tags = getStore(TAGS_STORE_NAME, true);
    let request = tags.put(item);
    request.onsuccess = function () {
      resolve();
    };
    request.onerror = function () {
      reject(request.error);
    };
  });
}

export function removeTagFromDb(tag: TTag) {
  let tags = getStore(TAGS_STORE_NAME, true);
  let request = tags.delete(tag.id);
  request.onsuccess = function () {
    notify("Запись успешно удалена");
  };
  request.onerror = function () {
    notifyError("Не удалось удалить запись", request.error);
  };
}
