export function capFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function formatDate(date) {
  const dateOptions = {
    formatMatcher: 'basic',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  };
  return new Date(date).toLocaleString('vi-VN', dateOptions);
}

export function resizeImg(url, width) {
  return `${url.slice(0, 33)}w=${width},a=0,q=90,u=1/${url.slice(33)}`;
}

export function formatMoney(number) {
  return `${parseFloat(number)
    .toFixed(0)
    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')} VND`;
}
