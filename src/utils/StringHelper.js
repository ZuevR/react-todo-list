export default class StringHelper {
  static sanitizeString = (value) => value.trim()
    .replace(/</g, '&#60')
    .replace(/>/g, '&#62');
}
