import { DataSource } from 'apollo-datasource'
import { omit, map } from 'lodash'

class InternshipsDataSource extends DataSource {
  constructor(Internship) {
    super()
    this.Internship = Internship
  }

  async getAllInternships() {
    const list = await this.Internship.find({})
    return list
  }

  async getInternshipByCandidate(id) {
    const internships = await this.Internship.find({
      'candidates.candidate': id,
    })
    const result = map(internships, (item) => {
      if (item.studentAccepted === id) {
        return { ...omit(item, ['__v', 'candidates']), accepted: true }
      } else {
        return { ...omit(item, ['__v', 'candidates']), accepted: false }
      }
    })
    return result
  }

  async getInternshipByID(id) {
    const internship = await this.Internship.findById(id)
    if (!internship) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Internship Not Found!',
      }
    }
    return {
      __typename: 'Internship',
      ...omit(internship, '__v'),
    }
  }

  async createInternship(input) {
    const newInternship = this.Internship(input)
    const result = await newInternship.save()
    if (!result) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Error in update Internship!',
      }
    }
    return {
      __typename: 'Internship',
      ...omit(result, '__v'),
    }
  }

  async updateInternship(id, input) {
    const internship = await this.Internship.findById(id)
    if (!internship) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Internship Not Found!',
      }
    }
    const result = await this.Internship.findByIdAndUpdate(id, input)
    if (!result) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Error in update Internship!',
      }
    }
    return {
      __typename: 'Internship',
      ...omit(internship, '__v'),
    }
  }

  async deleteInternship(id) {
    const internship = await this.Internship.findById(id)
    if (!internship) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Internship Not Found!',
      }
    }
    await this.Internship.findByIdAndDelete(id)
    return {
      __typename: 'SuccessMessage',
      message: 'The Internship was deleted successfully',
    }
  }
}

export default InternshipsDataSource
