exports.changeKey = (datas, keyToChange, newKey, keyToDelete) => {
  const formattedDatas = datas.map((data) => {
    const formattedData = { ...data };
    formattedData[newKey] = formattedData[keyToChange];
    delete formattedData[keyToChange];
    delete formattedData[keyToDelete];
    return formattedData;
  });
  return formattedDatas;
};
