const dateFormatter = (data) => {
  const date = data.location.localtime;
  const year = parseInt(date.substr(0,4));
  const month = parseInt(date.substr(5,2));
  const day = parseInt(date.substr(8,2));
  const time = date.substr(11);
  return [day,month,year,time];
}
const dayOfTheWeek = (day,month,year) => {
  return weekday[new Date(`${day}/${month}/${year}`).getDate()];
}