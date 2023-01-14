const date = new Date();

export const getDate = () => {
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return month + "/" + day;
};

export const getTime = () => {
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  return hours + ":" + minutes;
};
