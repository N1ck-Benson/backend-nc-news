exports.createRefObj = (items, key, value) => {
  const refObj = {};
  if (!items.length) {
    return refObj;
  }
  items.forEach((item) => {
    const refKey = item[key];
    const refValue = item[value];
    refObj[refKey] = refValue;
  });
  return refObj;
};

exports.formatData = (data, refObj, keyToChange, newKey) => {
  const formattedData = [];
  for (let i = 0; i < data.length; i++) {
    formattedData.push({ ...data[i] });
    formattedData[i][newKey] = refObj[formattedData[i][keyToChange]];
    delete formattedData[i][keyToChange];
  }
  return formattedData;
};
