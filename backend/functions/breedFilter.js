const Types = require("../Models/Types");

const filterBreed = async (type, breed) => {
  const TYPE = await Types.findOne({ type: type });
  console.log(TYPE)
  if (!TYPE) throw "Type is not allowed";

  if (!TYPE.breeds.includes(breed)) throw "Breed is not allowed";

  return breed;
};
module.exports = {
    filterBreed,
};
