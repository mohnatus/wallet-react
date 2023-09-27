import { getDb } from "./db";

export function getStore(storeName: string, toWrite: boolean = false) {
  let db = getDb();

  let transaction = db.transaction(
    storeName,
    toWrite ? "readwrite" : "readonly"
  );
  let store = transaction.objectStore(storeName);
  return store;
}
