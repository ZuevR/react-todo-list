export default class Validator {
  static required = (value) => !value.trim();

  static isEmail = (value) => !((/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value));

  static minLength = (value, min) => (value.trim().length < min);
}
