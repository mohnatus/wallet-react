let dbRequest: IDBOpenDBRequest;

export function setDb(db: IDBOpenDBRequest) {
  dbRequest = db;
}

export function getDb() {
  return dbRequest.result;
}
