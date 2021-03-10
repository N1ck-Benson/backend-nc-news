exports.formatComments = (comments, refObj) => {
  return comments.map((comment) => {
    return { ...comment, article_id: refObj[comment["belongs_to"]] };
  });
};
