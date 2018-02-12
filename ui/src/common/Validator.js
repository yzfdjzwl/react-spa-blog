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
  contructor() {
    this.cache = [];
  }

  add(value, rules) {
  }

  start() {
  }
}

const stragies = {
  isNotEmpty: value => {
    return !!value;
  },
  isEmail: value => {
    return /^[a-z1-9]+([_-]?[a-z0-9]+)*@[a-z1-9]+([_-]?[a-z0-9]+)*(\.[a-z]{2,3})+$/.test(value);
  },
  isUrl: value => {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(value);
  },
};

