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
