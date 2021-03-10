exports.createRefObj = (data, keyName, valueForKey) => {
  const refObj = {};
  data.forEach((obj) => {
    const keyForRefObj = obj[keyName]; // --> 'running a node app'
    const valueForRefObj = obj[valueForKey]; // --> 1
    refObj[keyForRefObj] = valueForRefObj;
    console.log(refObj, "<< refObj");
  });
  return refObj;
};
