import { DataSource } from 'apollo-datasource'

class UsersDataSource extends DataSource {
  constructor(User) {
    super()
    this.User = User
  }

  async getAllUser() {
    const list = await this.User.find({})
    return list
  }

  async getUserByID(id) {
    const user = await this.User.findById(id)
    return user
  }

  async createUser(input) {
    const newUser = this.User(input)
    const result = await newUser.save()
    if (!result) return { messsage: 'err' }
    return newUser
  }

  async updateUser(id, input) {
    const result = await this.User.findByIdAndUpdate(id, input)
    if (!result) return { messsage: 'err' }
    return result
  }

  async deleteUser(id) {
    const user = await this.User.findById(id)
    if (!user) return 'User Not Found !'
    await this.User.findByIdAndDelete(id)
    return 'The user was deleted successfully'
  }
}

export default UsersDataSource
