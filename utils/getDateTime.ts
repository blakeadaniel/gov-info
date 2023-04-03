export function getDateTime({ weekAgo }: { weekAgo: boolean }) {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate() - (weekAgo ? 1 : 0);
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  if (month.toString().length == 1) {
    month = '0' + month;
  }
  if (day.toString().length == 1) {
    day = '0' + (day - 1);
  }
  if (hour.toString().length == 1) {
    hour = '0' + hour;
  }
  if (minute.toString().length == 1) {
    minute = '0' + minute;
  }
  if (second.toString().length == 1) {
    second = '0' + second;
  }
  let dateTime =
    year +
    '-' +
    month +
    '-' +
    day +
    'T' +
    hour +
    '%3A' +
    minute +
    '%3A' +
    second +
    'Z';
  return dateTime;
}

export const oneWeekAgo = () => {
  const oneWeekAgo = new Date();
  ('2023-03-27T03:40:26:00Z');
  ('2018-01-28T20:18:10Z');
  const weekAgoDate = new Date(
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  ).setMilliseconds(0);
  const date = new Date(weekAgoDate)
    .toISOString()
    .replace('.', ':')
    .replace(':000Z', 'Z');
  return date;
};
