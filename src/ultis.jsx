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

export const SERVER_SETTING = {
  protocol: 'http://',
  url: 'localhost',
  port: 3000,
};

export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('peakVnState');
    const sessionProductList = sessionStorage.getItem('peakVnProductList');
    if (serializedState == null) {
      if (sessionProductList == null) {
        return undefined;
      }
      return JSON.parse(sessionProductList);
    }
    return {
      ...JSON.parse(serializedState),
      ...JSON.parse(sessionProductList),
    };
  } catch (e) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('peakVnState', serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const saveLocalState = state => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('peakVnProductList', serializedState);
  } catch (e) {
    console.log(e);
  }
};
