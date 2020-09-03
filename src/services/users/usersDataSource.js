import { DataSource } from 'apollo-datasource'
import { omit } from 'lodash'

class UsersDataSource extends DataSource {
  constructor(User) {
    super()
    this.User = User
  }

  async getAllUser() {
    const list = await this.User.find({})
    return list
  }

  async getUserByIDs(ids) {
    const list = await this.User.find({ id: { $in: ids } })
    return list
  }

  async getUserByID(id) {
    const user = await this.User.findById(id)
    return user
    // if (!user) {
    //   return {
    //     __typename: 'ErrorsMessage',
    //     errors: 'User Not Found !',
    //   }
    // }
    // return {
    //   __typename: 'User',
    //   ...omit(user, '__v'),
    // }
  }

  async createUser(input) {
    const newUser = this.User(input)
    const result = await newUser.save()
    if (!result) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Error in create',
      }
    }
    return {
      __typename: 'User',
      ...omit(result, '__v'),
    }
  }

  async updateUser(id, input) {
    const user = await this.User.findById(id)
    if (!user) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'User Not Found !',
      }
    }
    const result = await this.User.findByIdAndUpdate(id, input)
    if (!result) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Error in Update',
      }
    }
    return {
      __typename: 'User',
      ...omit(result, '__v'),
    }
  }

  async deleteUser(id) {
    const user = await this.User.findById(id)
    if (!user) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'User Not Found !',
      }
    }
    await this.User.findByIdAndDelete(id)
    return {
      __typename: 'SuccessMessage',
      message: 'The user was deleted successfully',
    }
  }

  async getUserForStudentAccepted(id) {
    const list = await this.User.find({
      'internshipsParticipated.internship': id,
      accepted: true,
    })
    return list
  }

  async getUserForCandidates(id) {
    const list = await this.User.find({
      internshipsParticipated: id,
    })
    console.log('UsersDataSource -> getUserForCandidates -> list', list)
    return list
  }
}

export default UsersDataSource
