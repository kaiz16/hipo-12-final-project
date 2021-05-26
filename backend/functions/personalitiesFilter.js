const personalities = require("../Models/Personalities");

const filterPersonalities = async (petPersonalities) => {
  const ALL_PERSONALITIES = await personalities.find({});
  const ALLOWED_PERSONALITIES = ALL_PERSONALITIES.map(p => p.personality)
  return petPersonalities.filter((personality) => ALLOWED_PERSONALITIES.includes(personality));
};
module.exports = {
  filterPersonalities,
};
