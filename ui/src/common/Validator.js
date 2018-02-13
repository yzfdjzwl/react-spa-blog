/**
 * 使用策略模式实现表单验证
 * Validator类对应 Context类
 * stragies对象对应多个策略类
 *
 * how to use:
 * const validator = new Validator();
 * validator.add();
 * validator.start();
 *
 */

export default class Validator {
  constructor() {
    this.cache = [];
  }

  add(value, rules) {
    for (let i = 0, l = rules.length; i < l; i++) {
      ((rule) => {
        this.cache.push(() => {
          const { strategy = 'isNoEmpty', errorMsg = '不能为空!' } = rule;
          const arg = [value, errorMsg];
          return stragies[strategy].apply(this, arg);
        });
      })(rules[i]);
    }
  }

  start() {
    for (let i = 0, validateFunc; validateFunc = this.cache[i++];) {
      const errorMsg = validateFunc();
      if (errorMsg) {
        return errorMsg;
      }
    }
  }
}

const stragies = {
  isNoEmpty: (value, errorMsg) => {
    if (!value) {
      return errorMsg;
    }
  },
  isEmail: (value, errorMsg) => {
    if (!/^[a-z1-9]+([_-]?[a-z0-9]+)*@[a-z1-9]+([_-]?[a-z0-9]+)*(\.[a-z]{2,3})+$/.test(value)) {
      return errorMsg;
    }
  },
  isUrl: (value, errorMsg) => {
    if (!/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(value)) {
      return errorMsg;
    }
  },
};

