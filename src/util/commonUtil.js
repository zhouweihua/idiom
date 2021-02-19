export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      // eslint-disable-next-line no-mixed-operators
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// export const baseUrl = "http://localhost:3000"
export const baseUrl = "https://www.eruditewiki.com"