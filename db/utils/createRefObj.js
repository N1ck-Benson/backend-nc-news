exports.createRefObj = (data, keyName, valueForKey) => {
  const refObj = {};
  data.forEach((obj) => {
    const keyForRefObj = obj[keyName];
    const valueForRefObj = obj[valueForKey];
    refObj[keyForRefObj] = valueForRefObj;
  });
  return refObj;
};
