const userCreateM = `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`;

const userGetByIdQ = `query UserGetById($userId: ID!) {
  userGetById(userId: $userId) {
    _id
    firstName
    lastName
  } 
}`;

const userGetAllQ =
    `query UsersGetAll {
        usersGetAll {
            _id
            firstName
            lastName
        }
    }`;

const userDeleteByIdM =
    `mutation UserDeleteById($userId: ID!) {
  userDeleteById(userId: $userId)
}`;

module.exports = {userCreateM, userGetByIdQ, userGetAllQ, userDeleteByIdM};