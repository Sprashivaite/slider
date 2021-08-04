const isObject = (value: unknown): boolean => {
  if (value === null) return false;
  if (Array.isArray(value)) return false;
  if (Object.getPrototypeOf(value) === Object.prototype) return true;
  return false;
};

export default isObject;
