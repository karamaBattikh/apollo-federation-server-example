import { DataSource } from 'apollo-datasource'
import { omit } from 'lodash'

class CandidatesDataSource extends DataSource {
  constructor(Candidate) {
    super()
    this.Candidate = Candidate
  }

  async getAllCandidate() {
    const list = await this.Candidate.find({})
    return list
  }

  async getCandidateByID(id) {
    const candidate = await this.Candidate.findById(id)
    if (!candidate) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'candidate Not Found !',
      }
    }
    return {
      __typename: 'Candidate',
      ...omit(candidate, '__v'),
    }
  }

  async getCandidateByStudent(idStudent) {
    const candidates = await this.Candidate.find({
      student: idStudent,
    })
    return candidates
  }

  async getCandidateByInternship(idStudent) {
    const candidates = await this.Candidate.find({
      internship: idStudent,
    })
    return candidates
  }

  async createCandidate(input) {
    const newCandidate = this.Candidate(input)
    const result = await newCandidate.save()
    if (!result) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Error in create',
      }
    }
    return {
      __typename: 'Candidate',
      ...omit(result, '__v'),
    }
  }

  async updateCandidate(id, input) {
    const candidate = await this.Candidate.findById(id)
    if (!candidate) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Candidate Not Found !',
      }
    }
    const result = await this.Candidate.findByIdAndUpdate(id, input)
    if (!result) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Error in Update',
      }
    }
    return {
      __typename: 'Candidate',
      ...omit(result, '__v'),
    }
  }

  async deleteCandidate(id) {
    const candidate = await this.Candidate.findById(id)
    if (!candidate) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Candidate Not Found !',
      }
    }
    await this.Candidate.findByIdAndDelete(id)
    return {
      __typename: 'SuccessMessage',
      message: 'The Candidate was deleted successfully',
    }
  }
}

export default CandidatesDataSource
