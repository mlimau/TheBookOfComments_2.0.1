const User = require('../User')
const userUpdateById = async (_, {
    userInput: {
      userId,
      firstName,
      lastName,
    }
  }
)=>{
  const wasUpdated = (await User.updateOne(
    {_id: userId},
    {firstName: firstName, lastName: lastName})).modifiedCount;
  return wasUpdated;
}
module.exports = userUpdateById
