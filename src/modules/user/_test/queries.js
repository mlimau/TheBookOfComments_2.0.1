//queries for requests-response structure

const userCreateQuery = `mutation UserCreate($userInput: UserItems) {
            userCreate(userInput: $userInput) {
                 _id
                firstName
                lastName
  }
}`

const userGetById = `query UserGetById($userId: ID!) {
                userGetById(userId: $userId) {
                    _id
                    firstName
                    lastName
                }
            }`

const userDeleteByIdM = `
                mutation UserDeleteById($userId: ID!) {
                userDeleteById(userId: $userId)
                }`

const getAllUsers = `
                query UsersGetAll($amount: Int) {
                  usersGetAll(amount: $amount) {
                        _id
                        firstName
                        lastName
                  }
                }`

const userUpdateById = `mutation UserUpdateById($userInput: UserFields) {
                        userUpdateById(userInput: $userInput) {
                        firstName
                        lastName
                        _id                    
                    }
                }`
const errorMassage = [
    "Cannot read properties of null (reading 'firstName')",
    "Cannot read properties of undefined (reading 'errors')",
    "Cannot return null for non-nullable field Query.userGetById.",
    `Cast to ObjectId failed for value "" (type string) at path "_id" for model "User"`
    ]





module.exports = { userCreateQuery, userGetById, userDeleteByIdM, getAllUsers, userUpdateById, errorMassage }