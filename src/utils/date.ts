export function _getDate(date: Date | number) {
  if (typeof date === "number") return new Date(date);
  return date;
}

export function formatDate(date: Date | number | null) {
  if (!date) return '...';
  const _date = _getDate(date);
  return `${_date.getDate()}.${_date.getMonth() + 1}.${_date.getFullYear()}`;
}
