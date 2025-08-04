// Функция для правильного построения колонок. По порядку сверху в низ.
export function splitIntoColumns(items, columns) {
  const perColumn = Math.ceil(items.length / columns);
  const result = [];

  for (let i = 0; i < columns; i++) {
    result.push(items.slice(i * perColumn, (i + 1) * perColumn));
  }

  return result;
}