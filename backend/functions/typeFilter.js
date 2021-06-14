const Types = require("../Models/Types");

const filterType = async (type) => {
  const TYPE = await Types.findOne({ type: type });
  if (!TYPE) throw "Type is not allowed";
  return type;
};
module.exports = {
  filterType,
};
