module.exports = async function howMany(model, user_id) {
  count = user_id
    ? await model.count({
        where: { user_id },
      })
    : await model.count({});
  return count;
}
