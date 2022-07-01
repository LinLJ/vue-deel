/* 合法uri*/
import ca from 'element-ui/src/locale/lang/ca';

export function validateURL(textval) {
  const urlregex =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}
// 是否是英文字母+_
export function validateCaseAndRail(str) {
  const reg = /^[A-Za-z_]+$/gi;
  return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validateAlphabets(rule, str, callback) {
  const reg = /^[A-Za-z_]+$/;
  if (str && !reg.test(str)) {
    callback(new Error('请输入英文'));
  } else {
    callback();
  }
}
/* 大小写字母数字*/

export function validateAlphabetsAndNumber(rule, str, callback) {
  const reg = /^[0-9a-zA-Z_]*$/;
  if (str && !reg.test(str)) {
    callback(new Error('请输入英文、数字、下划线'));
  } else {
    callback();
  }
}
/* 大小写字母数字*/
export function validateAlphabetsAndNumberStr(str) {
  const reg = /^[0-9a-zA-Z_]*$/;
  return reg.test(str);
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
// export function validateEmail(email) {
//   const re =
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(email);
// }
/**
 * 验证手机号或者电话号
 * @param  {[type]}   rule     [只判断手机号格式，不判断是否为空]
 * @param  {[type]}   value    获取的表单内容
 * @param  {Function} callback 验证后执行的回调
 * @return {[type]}            void
 */
export const validatePhone = function (rule, value, callback) {
  const phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
  const telReg = /^0\d{2,3}-?\d{7,8}$/;
  if (value && !phoneReg.test(value) && !telReg.test(value)) {
    callback(new Error('请输入正确手机号码或电话号码'));
  } else {
    callback();
  }
};
/**
 * @param rule 身份证号验证规则，只验证格式，不验证空值
 * @param value 表单值
 * @param callback 验证后的回调
 */
export const validateIDCard = function (rule, value, callback) {
  const num =
    /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  if (value && !num.test(value)) {
    callback(new Error('请输入正确的身份证号码'));
  } else {
    callback();
  }
};
/**
 * @param rule 统一社会信用代码输入规则，只验证格式，不验证空值
 * @param value 表单值
 * @param callback 验证后的回调
 */
export const validateCreditCode = function (rule, value, callback) {
  const reg = /((^[0-9A-Za-z]{15})|(^[0-9A-Za-z]{18}))$/;
  if (value && !reg.test(value)) {
    callback(new Error('请输入正确的统一社会信用代码'));
  } else {
    callback();
  }
};
/**
 * @param rule 含小数的数字，只验证格式，不验证空值
 * @param value 表单值
 * @param callback 验证后的回调
 */
export const validateNumber = (rule, value, callback) => {
  const reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
  if (value && !reg.test(value)) {
    callback(new Error('请输入数字'));
  } else {
    callback();
  }
};
/**
 * @param rule 正整数，只验证格式，不验证空值
 * @param value 表单值
 * @param callback 验证后的回调
 */
export const validateInteger = function (rule, value, callback) {
  const reg = /^\d+$/;
  if (value && !reg.test(value)) {
    callback(new Error('请输入正整数'));
  } else {
    callback();
  }
};
/**
 * @param rule 校验经度
 * @param value 表单值
 * @param callback 验证后的回调
 */
export const validateLongitude = function (rule, value, callback) {
  const reg = /^-?((0|[1-9]\d?|1[1-7]\d)(\.\d{1,7})?|180(\.0{1,7})?)?$/;
  if (value && !reg.test(value)) {
    callback(new Error('请输入正确的经度'));
  } else {
    callback();
  }
};
/**
 * @param rule 校验纬度
 * @param value 表单值
 * @param callback 验证后的回调
 */
export const validateLatitude = function (rule, value, callback) {
  const reg = /^-?((0|[1-8]\d|)(\.\d{1,7})?|90(\.0{1,7})?)?$/;
  if (value && !reg.test(value)) {
    callback(new Error('请输入正确的纬度'));
  } else {
    callback();
  }
};
/**
 * @param rule 校验金额 大于0 最多5位小数
 * @param value 表单值
 * @param callback 验证后的回调
 */
export const validateAmounts = function (rule, value, callback) {
  const reg = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{5}$)/;
  if (value && !reg.test(value)) {
    callback(new Error('请输入正确的金额'));
  } else {
    callback();
  }
};

/**
 *
 * @param {判空} rule
 * @param {表单值} value
 * @param {验证后的回调} callback
 */
export const validateEmpty = function (rule, value, callback) {
  const reg = /^[ ]*$/;
  if (value && !reg.test(value)) {
    callback(new Error('请输入'));
  } else {
    callback();
  }
};
/**
 * 判断是否是json
 *
 * @param str
 * @returns {boolean}
 */
export function isJSON(str) {
  if (typeof str === 'string') {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
}

export function isRegex(rule, value, callback) {
  if (
    (value.substr(0, 1) === '*' && value.substr(value.length - 1, 1) !== '*') ||
    (value.substr(value.length - 1, 1) === '*' && value.substr(0, 1) !== '*')
  ) {
    const reg = /^[A-Za-z_*]+$/;
    if (value && reg.test(value)) {
      callback();
    } else {
      callback(new Error('请输入正确的格式'));
    }
  } else {
    callback(new Error('请输入正确的格式'));
  }
}

export function isDimension(rule, value, callback) {
  const arr = value.split(',');
  let valid = true;
  arr.every((item) => {
    if (item.substr(0, 1) !== "'" || item.substr(item.length - 1, 1) !== "'") {
      valid = false;
      return false;
    } else {
      valid = true;
      return true;
    }
  });
  if (valid) {
    callback();
  } else {
    callback(new Error('请输入正确的格式'));
  }
}
