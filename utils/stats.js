const { benchmarkLevel } = wx.getSystemInfoSync();
/**
 * 友盟埋点
 * @param {String} eventId 事件id
 * @param {Object} [params={}] 属性
 */
export function stats(eventId, params = {}) {
  try {
    const allParams = Object.assign({ benchmarkLevel: `${benchmarkLevel}` }, params);
    wx.uma.trackEvent(`${eventId}2`, allParams);
  } catch (e) {}
}

/**
 * 计算经过的时间等级，以每0.5s为一个分界线
 * @param {Number} startTime 开始时间戳
 * @returns {Number} 时间等级
 */
export function getTimeLevel(startTime) {
  try {
    return Math.ceil((Date.now() - startTime) / 500) + '';
  } catch (e) {
    return "1";
  }
}