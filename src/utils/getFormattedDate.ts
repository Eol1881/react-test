export function getFormattedDate(timeStamp: number) {
  const date = new Date(timeStamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}
