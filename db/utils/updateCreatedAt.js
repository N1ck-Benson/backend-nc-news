// updateCreatedAt()

exports.updateCreatedAt = (data) => {
  for (let i = 0; i < data.length; i++) {
    const timeInteger = data[i].created_at;
    const timestamp = new Date(timeInteger);
    data[i].created_at = timestamp;
  }
  return data;
};
