export const capitialize = (str) => {
  if (!str) return ""; // if str is undefined, null, or empty, return empty string
  return str.charAt(0).toUpperCase() + str.slice(1);
};
