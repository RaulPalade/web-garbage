export const formatItalianDate = (text: string): string => {
  const date = new Date(text);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${addZero(day)}/${addZero(month)}/${year}`;

  return formattedDate;
};

const addZero = (value: number): string => {
  return value < 10 ? `0${value}` : `${value}`;
};
