// updateCreatedAt()

exports.updateCreatedAt = (data) => {
  for (let i = 0; i < data.length; i++) {
    const timeInteger = data[i].created_at;
    const timestamp = new Date(timeInteger);
    data[i].created_at = timestamp;
  }
  return data;
};

const testCreatedAt = () => {
  const timenow = Date.now()
  console.log(timenow)
  const time = new Date(timenow)
  console.log(typeof time)
}

testCreatedAt()