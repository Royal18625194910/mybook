// 补零
const tsPadStart = (str) => {
  str = String(str);

  return str.padStart(2, '0');
};

// 格式化时间戳
export const formatTimestamp = (ts) => {
  const date = new Date(Number(ts));

  const YYYY = date.getFullYear();
  const MM = tsPadStart(date.getMonth() + 1);
  const DD = tsPadStart(date.getDate());

  const hh = tsPadStart(date.getHours());
  const mm = tsPadStart(date.getMinutes());
  const ss = tsPadStart(date.getSeconds());

  return `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`;
};