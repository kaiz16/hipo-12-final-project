const personalities = require('../Models/Personalities')

const filterPersonalities = async (petPersonalities) => {
    const ALLOWED_PERSONALITIES = await personalities.find({});
    return petPersonalities.filter(personality => ALLOWED_PERSONALITIES.includes(personality))
}
module.exports = {
    filterPersonalities
}