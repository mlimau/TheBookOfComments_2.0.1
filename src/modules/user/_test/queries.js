const userCreateQuery = `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`;

const userGetAllQuery =
   `query UsersGetAll {
        usersGetAll {
            _id
            firstName
            lastName
        }
    }`;

module.exports = { userCreateQuery, userGetAllQuery }