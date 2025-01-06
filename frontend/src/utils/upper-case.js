/**
 * Function that it converts the first letter of a string to uppercase
 */

export const upperCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}