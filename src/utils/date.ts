export function _getDate(date: Date | number) {
  if (typeof date === "number") return new Date(date);
  return date;
}

export function formatDate(date: Date | number | null) {
  if (!date) return '...';
  const _date = _getDate(date);
  return `${_date.getDate()}.${_date.getMonth() + 1}.${_date.getFullYear()}`;
}

export function getDiff(date1: Date | number, date2?: Date | number | null) {
  if (!date2) date2 = new Date()
  const diff = Math.floor((+date2 - +date1) / 1000);
  const hours = diff / 60 / 60;
  const days = hours / 24;
  return Math.floor(days);
}