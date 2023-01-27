/**
 *
 * @param valueType {string} full model path
 *
 * @returns {sting} just the type
 */
const getOnlyValueType = (valueType: string) => {
  const pieces = valueType.split(/[\s.]+/); // Split on .
  return pieces[pieces.length - 1];
};

export {getOnlyValueType}